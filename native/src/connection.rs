extern crate redis;


use std::cell::RefCell;

use redis::{Client, Connection};

pub struct RedisConnection {
    pub host: String,
    pub port: String,
    pub password: String
}

// thread_local!(static ODB: RefCell<Client> = RefCell::New(None));



pub fn init_connection(connection: RedisConnection) {
    // let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    // let mut con = client.get_connection().unwrap();
}

pub fn get_connection() {

}

fn close_connection() {

}

