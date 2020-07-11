extern crate js_sys;
use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust-wasm-frontend!");
}

#[wasm_bindgen]
pub fn collect_numbers(numbers: &JsValue) -> Result<js_sys::Array, JsValue> {  
    let nums = js_sys::Array::new();

    let iterator = js_sys::try_iter(numbers)?.ok_or_else(|| {
        "need to pass iterable JS values!"
    })?;

    for x in iterator {
        // If the iterator's `next` method throws an error, propagate it
        // up to the caller.
        let x = x?;

        // If `x` is a number, add it to our array of numbers!
        if x.as_f64().is_some() {
            nums.push(&x);
        }
    } 

    Ok(nums)
}

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();


    // Your code goes here!
    console::log_1(&JsValue::from_str("Hello world!"));

    Ok(())
}
