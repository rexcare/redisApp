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
    let js_object_handle: Handle<JsObject> = cx.argument(0)?;

    let js_object = js_object_handle
        .downcast::<JsObject>()
        .unwrap_or(JsObject::new(&mut cx));

    let host = js_object
        .get(&mut cx, "host")?
        .downcast::<JsString>()
        .unwrap_or(cx.string(""));

    let port = js_object
        .get(&mut cx, "port")?
        .downcast::<JsString>()
        .unwrap_or(cx.string(""));

    let password = js_object
        .get(&mut cx, "password")?
        .downcast::<JsString>()
        .unwrap_or(cx.string(""));

    let user = js_object
        .get(&mut cx, "user")?
        .downcast::<JsString>()
        .unwrap_or(cx.string(""));

    let cb = cx.argument::<JsFunction>(1)?;

    let connection_options = ConnectionOptions {
      host: host.value(),
      port: port.value(),
      password: password.value(),
      user: user.value()
    };

    connection::open_connection(connection_options, cb);

    Ok(cx.undefined())
}



fn get_keys() {
    match connection::get_connection() {
      Some(redis_conn) =>  {
        query::get_keys(redis_conn);
      },
      None => {
        println!("Errored");
      },
    };
}


register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("openConnection", open_connection)
});
