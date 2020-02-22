extern crate redis;
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

pub fn init_connection(connection: ConnectionOptions) -> Result<(), RedisError> {
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
      Err(_e) => {
        println!("error here");
      },
    }

    unsafe {
      let client = Client::open(connection_url)?;

      println!("executing ...");

        match client.get_connection() {
          Ok(c) => {
            println!("not Errored");
            REDIS_CONTEXT.connection = Some(c);

          },
          Err(err) => {
            println!("Errored");
            REDIS_CONTEXT.connection = None;
          },
        };

    }

    println!("continuing ....");

    Ok(())
}

pub fn get_connection() -> Option<&'static mut Connection>{
    unsafe {
      match REDIS_CONTEXT.connection.as_mut() {
        Some(connection) => Some(connection),
        None => None
      }
    }
}

// fn close_connection() {

// }
