extern crate neon;
extern crate redis;
extern crate serde_json;

use self::serde_json::{Value, Map, Number};
use redis::{Connection};


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

pub fn get_query_result(_connection: &mut redis::Connection, query: &str) {

}
