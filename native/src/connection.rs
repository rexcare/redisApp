extern crate redis;


use std::cell::RefCell;

use redis::{Client, Connection, parse_redis_url, RedisResult, RedisError};

pub struct ConnectionOptions {
    pub host: String,
    pub port: String,
    pub password: String,
    pub user: String,
}


struct Global_Connection {
  client: Option<Client>,
  conn: Option<Connection>,
}

// impl Global_Connection  {
//   fn set_connection(&mut self) {

//   }

//   fn get_connection() {

//   }
// }


static mut redis_connection: Global_Connection = Global_Connection {
  client: None,
  conn: None
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
      Ok(v) => {
        println!("no error {}", connection_url);
      },
      Err(e) => {
        println!("error here");
      },
    }

    // let client = Client::open("redis://127.0.0/")?;
    // let mut con = client.get_connection()?;



    unsafe {
      redis_connection.client = match Client::open(connection_url) {
        Ok(c) => Some(c),
        Err(err) => None,
      };

      if redis_connection.client.is_none() == false {
        redis_connection.conn = match redis_connection.client.as_ref().unwrap().get_connection() {
          Ok(c) => {
            println!("not Errored");
            Some(c)
          },
          Err(err) => {
            println!("Errored");
            None
          },
        }
      }
    }

    Ok(())



    // unsafe {
    //   redis_connection.client = match Client::open(connection_url) {
    //     Ok(c) => Some(c),
    //     Err(err) => {
    //       println!("error 1 {}", err);
    //       panic!("panics ...")
    //     }
    //   };

    //   if redis_connection.client.is_none() == false {
    //     redis_connection.conn = match redis_connection.client.as_ref().unwrap().get_connection() {
    //       Ok(c) => Some(c),
    //       Err(e) => {
    //         println!("before panicking ...");
    //         panic!("error")
    //         // println!("error 2 {}", e);
    //         // None
    //       }
    //     };
    //   }
    // }


    // let client = Client::open(connection_url).unwrap_or_else(|error| {
    //   if error {
    //     println!("error 1 {;?}", error);
    //   } else {
    //     println!("NO ERROR 1");
    //     let mut con = client.get_connection().unwrap_or_else(|error| {
    //       if error {
    //         println!("error 2 {;?}", error);
    //       } else {
    //         println!("NO ERROR 2 {;?}", error);
    //       }
    //     })
    //   }
    // })




    // let client = Client::open("redis://127.0.0.1/").unwrap();
    // let mut con = client.get_connection().unwrap();
}

pub fn get_connection() {

}

fn close_connection() {

}

