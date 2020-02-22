extern crate neon;
extern crate redis;

use redis::{Connection};



pub fn get_keys(connection: &mut Connection) {
    let keys: Vec<String> = redis::cmd("KEYS").arg("*").query(connection).unwrap();
    for x in keys {
        println!("key - {}", x);
    }
}


pub fn run_query(con: &mut redis::Connection, query: &str) {

}
