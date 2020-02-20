extern crate neon;
extern crate redis;
#[macro_use] extern crate lazy_static;

mod connection;

use neon::prelude::*;

use connection::{RedisConnection};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node from electron"))
}


fn open_connection(mut cx: FunctionContext) -> JsResult<JsUndefined> {

    let host = cx.argument::<JsString>(0)?.value();
    let port = cx.argument::<JsString>(1)?.value();
    let password = cx.argument::<JsString>(2)?.value();


    let redis_conn = RedisConnection {
      host: host,
      port: port,
      password: password
    };

    connection::init_connection(redis_conn);

    Ok(cx.undefined())
}



fn connectToRedisServer(mut cx: FunctionContext) -> JsResult<JsUndefined> {
  // let host = cx.argument::<JsString>(0).value()?;
  // let port = cx.argument::<JsString>(1).value()?;
  // let password = cx.argument::<JsString>(2).value()?;
  // let database = cx.argument::<JsString>(3).value()?;

  // let client = try!(redis::Client::open("redis://127.0.0.1/"));
  Ok(cx.undefined())
}

// fn runRawCmd(mut cx: FunctionContext) -> JsResult<JsString> {

//   println!("inside runRawCmd");

//   let client = redis::Client::open("redis://127.0.0.1/").unwrap();
//   let mut con = client.get_connection().unwrap();

//   let mut cmd = redis::Cmd::new();
//   let cmd_string: &str = "set a 5";
//   // let name: redis::RedisResult<redis::InfoDict> = cmd("GET").arg("a").query(&mut con);


//   // cmd.arg(cmd_string);

//   // let result: redis::RedisResult<redis::InfoDict> = cmd.query(&mut con);

//   // match name {
//   //   Ok(thing) => {
//   //       println!("Redis: {:?}", thing);
//   //   },
//   //   Err(err) => {
//   //       eprintln!("Redis Error: {:?}", err);
//   //   },
//   // }

//   // Ok(cx.string("runRawCmd ..."))
// }




register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    // cx.export_function("runRawCmd", runRawCmd)?;
    cx.export_function("openConnection", open_connection)
});
