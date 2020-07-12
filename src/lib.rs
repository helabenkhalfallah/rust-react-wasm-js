extern crate js_sys;
extern crate serde_json;
use js_sys::Array;
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
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust-wasm-frontend!");
}

#[wasm_bindgen]
pub fn collect_numbers(numbers: &JsValue) -> Result<Array, JsValue> {
    let nums = Array::new();

    let iterator = js_sys::try_iter(numbers)?.ok_or_else(|| "need to pass iterable JS values!")?;

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
pub struct Photo {
    albumId: i64,
    id: i64,
    title: String,
    url: String,
    thumbnailUrl: String,
}

#[derive(Serialize, Deserialize)]
pub struct PhotoOutput {
    albumId: i64,
    id: i64,
    title: String,
    url: String,
    thumbnailUrl: String,
    value: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Geo {
    pub lat: String,
    pub lng: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Address {
    pub street: String,
    pub suite: String,
    pub city: String,
    pub zipcode: String,
    pub geo: Geo,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Company {
    pub name: String,
    pub catchPhrase: String,
    pub bs: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i64,
    pub name: String,
    pub username: String,
    pub email: String,
    pub address: Address,
    pub phone: String,
    pub website: String,
    pub company: Company,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SocialFriend {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SocialUser {
    pub _id: String,
    pub index: i64,
    pub guid: String,
    pub isActive: bool,
    pub balance: String,
    pub picture: String,
    pub age: i32,
    pub eyeColor: String,
    pub name: String,
    pub gender: String,
    pub company: String,
    pub email: String,
    pub phone: String,
    pub address: String,
    pub about: String,
    pub registered: String,
    pub latitude: f64,
    pub longitude: f64,
    pub greeting: String,
    pub favoriteFruit: String,
    pub friends: Vec<SocialFriend>,
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ServerError {
    pub message: String,
    pub status: i32,
}

#[wasm_bindgen]
pub fn transform_me(js_objects: &JsValue) -> JsValue {
    let mut elements: Vec<Photo> = js_objects.into_serde().unwrap();
    elements.sort_by(|a, b| a.id.partial_cmp(&b.id).unwrap());

    let values: Vec<PhotoOutput> = elements
        .iter()
        .map(|e| {
            let _title = &e.title;
            let _thumbnail_url = &e.thumbnailUrl;
            let _url = &e.url;
            let _id = e.id;
            PhotoOutput {
                albumId: e.albumId,
                id: _id,
                value: format!("id: {}, value: {}", _title, _id),
                title: format!("{}", _title),
                thumbnailUrl: format!("{}", _thumbnail_url),
                url: format!("{}", _url),
            }
        })
        .filter(|e| e.id > 200)
        .collect();

    JsValue::from_serde(&values).unwrap()
}

#[wasm_bindgen]
pub async fn get_all_users() -> Result<JsValue, JsValue> {
    let result = reqwest::Client::new()
        .get("https://jsonplaceholder.typicode.com/users")
        .send()
        .await;

    match result {
        Ok(result) => {
            let text = result.text().await.unwrap();
            let users: Vec<User> = serde_json::from_str(&text).unwrap();
            Ok(JsValue::from_serde(&users).unwrap())
        }
        Err(_e) => {
            let message = "".to_string();
            let empty_users = ServerError {
                message: message,
                status: 200,
            };
            Ok(JsValue::from_serde(&empty_users).unwrap())
        }
    }
}

#[wasm_bindgen]
pub async fn get_all_photos() -> Result<JsValue, JsValue> {
    let result = reqwest::Client::new()
        .get("https://jsonplaceholder.typicode.com/photos")
        .send()
        .await;

    match result {
        Ok(result) => {
            let text = result.text().await.unwrap();
            let photos: Vec<Photo> = serde_json::from_str(&text).unwrap();
            Ok(JsValue::from_serde(&photos).unwrap())
        }
        Err(_e) => {
            let message = "".to_string();
            let empty_photo = ServerError {
                message: message,
                status: 200,
            };
            Ok(JsValue::from_serde(&empty_photo).unwrap())
        }
    }
}

#[wasm_bindgen]
pub async fn get_all_socials() -> Result<JsValue, JsValue> {
    let result = reqwest::Client::new()
        .get("http://localhost:3000/socials")
        .send()
        .await;

    match result {
        Ok(result) => {
            let text = result.text().await.unwrap();
            let socials: Vec<SocialUser> = serde_json::from_str(&text).unwrap();
            Ok(JsValue::from_serde(&socials).unwrap())
        }
        Err(_e) => {
            let message = "".to_string();
            let empty_social = ServerError {
                message: message,
                status: 200,
            };
            Ok(JsValue::from_serde(&empty_social).unwrap())
        }
    }
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
