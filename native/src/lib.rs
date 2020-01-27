#[macro_use]
extern crate neon;
extern crate redis;
extern crate futures;
extern crate tokio;

use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node from electron"))
}


fn connectToRedisServer(mut cx: FunctionContext) -> JsResult<JsString> {
  let host = cx.argument::<JsString>(0).value()?;
  let port = cx.argument::<JsString>(1).value()?;
  let password = cx.argument::<JsString>(2).value()?;
  let database = cx.argument::<JsString>(3).value()?;

  let client = try!(redis::Client::open("redis://127.0.0.1/"));
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
