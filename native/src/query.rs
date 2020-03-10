extern crate neon;
extern crate redis;
extern crate serde_json;

use self::serde_json::{Map, Number, Value};
use redis::Connection;

const STRING_TYPE: &str = "string";
const LIST_TYPE: &str = "list";
const SET_TYPE: &str = "set";
const ZSET_TYPE: &str = "zset";
const HASH_TYPE: &str = "hash";
const STREAM_TYPE: &str = "stream";

pub fn get_all_key_values(_connection: &mut Connection) -> String {
  let keys: Vec<String> = redis::cmd("KEYS").arg("*").query(_connection).unwrap();
  let mut key_vals = Map::new();

  for key in keys {
    let mut key_val_pair = Map::new();
    let key_type: String = redis::cmd("TYPE").arg(&key).query(_connection).unwrap();

    key_val_pair.insert("type".to_string(), Value::String(key_type.to_string()));

    if STRING_TYPE == key_type.to_lowercase() {
      let value: String = redis::cmd("GET").arg(&key).query(_connection).unwrap();
      key_val_pair.insert("value".to_string(), Value::String(value.to_string()));
    }

    key_vals.insert(key.to_string(), Value::Object(key_val_pair));
  }

  return serde_json::to_string(&key_vals).unwrap();
}

pub fn get_val_for_key(_connection: &mut redis::Connection, _type: &str, _key: &str) -> String {
  let mut res = Vec::<String>::new();

  if HASH_TYPE == _type.to_lowercase() {
    res = redis::cmd("HGETALL").arg(_key).query(_connection).unwrap();
  } else if LIST_TYPE == _type.to_lowercase() {
    res = redis::cmd("LRANGE")
      .arg(_key)
      .arg(0)
      .arg(-1)
      .query(_connection)
      .unwrap();
  } else if SET_TYPE == _type.to_lowercase() {
    res = redis::cmd("SMEMBERS").arg(_key).query(_connection).unwrap();
  } else if ZSET_TYPE == _type.to_lowercase() {
    res = redis::cmd("ZRANGE")
      .arg(_key)
      .arg(0)
      .arg(-1)
      .query(_connection)
      .unwrap();
  } else {
    panic!("Type not found");
  }

  let mut val_map = Map::new();
  let mut res_map = Map::new();

  val_map.insert("type".to_string(), Value::String(_type.to_string()));
  //val_map.insert("value".to_string(), Value::Array(res));

  res_map.insert(_key.to_string(), Value::Object(val_map));

  return serde_json::to_string(&res_map).unwrap();
}

pub fn get_query_result(_connection: &mut redis::Connection, _query: &str) {}
