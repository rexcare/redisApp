extern crate neon;
extern crate redis;
#[macro_use] extern crate lazy_static;

mod connection;
mod query;
mod serialize;

use neon::prelude::*;

use connection::{ConnectionOptions};

use redis::{RedisResult, Connection};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node from electron"))
}

fn open_connection(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let host = cx.argument::<JsString>(0)?.value();
    let port = cx.argument::<JsString>(1)?.value();
    let password = cx.argument::<JsString>(2)?.value();
    let user = cx.argument::<JsString>(3)?.value();

    let connection_options = ConnectionOptions {
      host: host,
      port: port,
      password: password,
      user: user
    };

    connection::init_connection(connection_options);

    match connection::get_connection() {
      Some(redis_conn) =>  {
        redis::cmd("KEYS").arg("*").query(redis_conn).unwrap();
        // query::get_keys(&mut redis_conn);
      },
      None => {
        println!("Errored");
      },
    };

    // };

    // let mut redis_conn = match connection::get_connection() {
    //   Ok(c) => c,
    //   Err(e) => Err(e),
    // };



    Ok(cx.undefined())
}









register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("openConnection", open_connection)
});
