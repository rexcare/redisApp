extern crate neon;
extern crate redis;

use neon::prelude::*;
use redis::{Client, Connection, parse_redis_url, RedisError};

pub struct ConnectionOptions {
    pub host: String,
    pub port: String,
    pub password: String,
    pub user: String,
}

struct RedisContext {
  connection: Option<Connection>,
}

static mut REDIS_CONTEXT: RedisContext = RedisContext {
    connection: None
};

struct ConnectionTask {
  connection: ConnectionOptions,
}

impl Task for ConnectionTask {
    type Output = bool;
    type Error = String;
    type JsEvent = JsBoolean;

    fn perform(&self) -> Result<Self::Output, Self::Error> {
        match init_connection(&self.connection) {
            Ok(_) => Ok(true),
            Err(_e) => {
                Err(format!("{}", _e))
            }
        }
    }

    fn complete(self, mut cx: TaskContext, result: Result<Self::Output, Self::Error>) -> JsResult<Self::JsEvent> {
        match result {
            Ok(res) => Ok(cx.boolean(res)),
            Err(_) => cx.throw_error(&result.unwrap_err())
        }
    }
}

fn init_connection(connection: &ConnectionOptions) -> Result<(), RedisError> {
    let mut connection_url = if connection.password.is_empty() == false {
        format!("redis://{}:{}@{}", connection.user, connection.password, connection.host)
    } else {
        format!("redis://{}", connection.host)
    };

    connection_url = match connection.port.is_empty() {
      true => connection_url,
      false => format!("{}:{}", connection_url, connection.port)
    };


    match parse_redis_url(&connection_url) {
      Ok(_) => {
        println!("no error {}", connection_url);
      },
      Err(err) => err

    }

    unsafe {
        let client = Client::open(connection_url)?;

        match client.get_connection() {
            Ok(c) => {
                REDIS_CONTEXT.connection = Some(c);
            },
            Err(err) => {
                println!("Error in get_connection {:?}", err);
                REDIS_CONTEXT.connection = None;
                return Err(err);
            },
        };
    }

    Ok(())
}


pub fn open_connection(connection_options: ConnectionOptions, cb: Handle<JsFunction>) {
    let task = ConnectionTask { connection: connection_options };
    task.schedule(cb);
}


pub fn get_connection() -> Option<&'static mut Connection>{
    unsafe {
        match REDIS_CONTEXT.connection.as_mut() {
            Some(connection) => Some(connection),
            None => None
        }
    }
}

pub fn close_connection() {
    unsafe {
      REDIS_CONTEXT.connection = None;
    }
}
