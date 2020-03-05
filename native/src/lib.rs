extern crate neon;
extern crate redis;
#[macro_use] extern crate lazy_static;

mod connection;
mod query;

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

fn close_connection(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    connection::close_connection();
    Ok(cx.undefined())
}


fn get_all_key_values(mut cx: FunctionContext) -> JsResult<JsString> {
    match connection::get_connection() {
      Some(redis_conn) =>  {
          let result: String = query::get_all_key_values(redis_conn);
          return Ok(cx.string(&result));
      },
      None => {
          return cx.throw_error("Unable to get connection !");
      },
    };
}


fn get_query_result(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let cmd = cx.argument::<JsString>(0)?.value();
    match connection::get_connection() {
      Some(redis_conn) => {
        query::get_query_result(redis_conn, &cmd);
      },
      None => {
        println!("");
      }
    }
    Ok(cx.undefined())
}



register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("openConnection", open_connection)?;
    cx.export_function("closeConnection", close_connection)?;
    cx.export_function("getAllKeyValues", get_all_key_values)?;
    cx.export_function("getQueryResult", get_query_result)
});
