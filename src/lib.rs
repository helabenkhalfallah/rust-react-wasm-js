extern crate serde_json;
extern crate js_sys;
use wasm_bindgen::prelude::*;
use web_sys::console;
use js_sys::Array;

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
pub fn collect_numbers(numbers: &JsValue) -> Result<Array, JsValue> {  
    let nums = Array::new();

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

#[macro_use]
extern crate serde_derive;

#[derive(Serialize, Deserialize)]
pub struct Element {
    album_id: i32,
    id: i32,
    title: String,
    url: String,
    thumbnail_url: String,
}

#[derive(Serialize, Deserialize)]
pub struct ElementOutput {
    album_id: i32,
    id: i32,
    title: String,
    url: String,
    thumbnail_url: String,
    value: String
}

#[wasm_bindgen]
pub fn transfom_me(js_objects: &JsValue) -> JsValue {
    let mut elements: Vec<Element> = js_objects.into_serde().unwrap();
    elements.sort_by(|a, b| a.id.partial_cmp(&b.id).unwrap());
    
    let values: Vec<ElementOutput> = elements
        .iter()
        .map(|e| {
            let _title = &e.title;
            let _thumbnail_url = &e.thumbnail_url;
            let _url = &e.url;
            let _id = e.id;
            ElementOutput{
                album_id: e.album_id,
                id: _id,
                value: format!("id: {}, value: {}", _title, _id),
                title: format!("{}", _title),
                thumbnail_url: format!("{}", _thumbnail_url),
                url: format!("{}", _url),
            }
        })
        .filter(|e| {
            e.id > 200
        })
        .collect();
     
    JsValue::from_serde(&values).unwrap()
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
