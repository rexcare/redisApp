extern crate neon;
extern crate redis;

use redis::{Connection};



pub fn get_keys(con: &mut redis::Connection) {
    let keys: Vec<String> = redis::cmd("KEYS").arg("*").query(con).unwrap();

    // for x in keys {
    //     println!("key - {}", x);
    // }

    // let iter: redis::Iter<isize> = try!(con.scan());
    //     for x in iter {
    //     println!("{}",x);
    // }
}


pub fn run_query(con: &mut redis::Connection, query: &str) {

}
