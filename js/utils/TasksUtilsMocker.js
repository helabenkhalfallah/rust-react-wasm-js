import MockData from './MockData';
import axios from 'axios';

const arrayBigTasks = (wasm) => {
    const {
        collect_numbers,
        transform_me
      } = wasm || {};

    if(transform_me){
        const moreBigData = [
          ...MockData,
          ...MockData,
        ]
        const jsMapT0 = performance.now();
        const resultJSMap = moreBigData
                                .sort((a,b) => a.id - b.id)
                                .map(item => ({
                                  album_id: item.album_id,
                                  id: item.id,
                                  value: `id: ${item.id}, value: ${item.title}`,
                                  title: item.title,
                                  thumbnail_url: item.thumbnail_url,
                                  url: item.url,
                                }))
                                .filter(item => item.id > 200)
        const jsMapT1 = performance.now();
        console.log("Call to JS map took " + (jsMapT1 - jsMapT0) + " milliseconds.")
        console.log("resultJSMap : ", resultJSMap); 
  
        const wasmT0 = performance.now();
        const resultWASMMap = transform_me(moreBigData);
        const wasmT1 = performance.now();
        console.log("Call to Rust WASM transform_me took " + (wasmT1 - wasmT0) + " milliseconds.");
        console.log("resultWASMMap : ", resultWASMMap);
      }
  
      if(collect_numbers){
        const entries = [
          ...[...Array(40000)].map(e=>~~(Math.random() * 4000)),
        ];
        console.log("entries : ", entries);
  
        const jsFilterT0 = performance.now();
        const resultJSFilter = entries.filter(item => typeof item === 'number')
        const jsFilterT1 = performance.now();
        console.log("Call to JS filter took " + (jsFilterT1 - jsFilterT0) + " milliseconds.")
        console.log("resultJSFilter : ", resultJSFilter);
  
        const wasmT0 = performance.now();
        const resultWasmFilter = collect_numbers(entries);
        const wasmT1 = performance.now();
        console.log("Call to Rust collect_numbers took " + (wasmT1 - wasmT0) + " milliseconds.");
        console.log("resultWasmFilter : ", resultWasmFilter);
      }
}


const jsRequestUsers = (wasm) => {
  const {
    get_all_users,
  } = wasm || {};
  const wasmT0 = performance.now();

  if(get_all_users){
      axios
          .get('https://jsonplaceholder.typicode.com/users', { crossdomain: true })
          .then(data => {
            const wasmT1 = performance.now();
            console.log("JSRequestUsers took " + (wasmT1 - wasmT0) + " milliseconds.");
            console.log('JSRequestUsers data : ', data);
          })
          .catch(error => console.log('JSRequestUsers error : ', error));
  }
};

const wasmRequestUsers = (wasm) => {
    const {
      get_all_users,
    } = wasm || {};
    const wasmT0 = performance.now();

    if(get_all_users){
      get_all_users()
      .then(data => {
        const wasmT1 = performance.now();
        console.log("wasmRequestUsers took " + (wasmT1 - wasmT0) + " milliseconds.");
        console.log('wasmRequestUsers data : ', data);
      })
      .catch(error => console.log('wasmRequestUsers error : ', error));
    }
};

const jsRequestPhotos = (wasm) => {
  const {
    get_all_photos,
  } = wasm || {};
  const wasmT0 = performance.now();

  if(get_all_photos){
      axios
          .get('https://jsonplaceholder.typicode.com/photos', { crossdomain: true })
          .then(data => {
            const wasmT1 = performance.now();
            console.log("jsRequestPhotos took " + (wasmT1 - wasmT0) + " milliseconds.");
            console.log('jsRequestPhotos data : ', data);
          })
          .catch(error => console.log('jsRequestPhotos error : ', error));
  }
};

const wasmRequestPhotos = (wasm) => {
    const {
      get_all_photos,
    } = wasm || {};
    const wasmT0 = performance.now();

    if(get_all_photos){
      get_all_photos()
      .then(data => {
        const wasmT1 = performance.now();
        console.log("wasmRequestPhotos took " + (wasmT1 - wasmT0) + " milliseconds.");
        console.log('wasmRequestPhotos data : ', data);
      })
      .catch(error => console.log('wasmRequestPhotos error : ', error));
    }
};

const jsRequestSocials = (wasm) => {
  const {
    get_all_socials,
  } = wasm || {};
  const wasmT0 = performance.now();

  if(get_all_socials){
      axios
          .get('http://localhost:3000/socials', { crossdomain: true })
          .then(data => {
            const wasmT1 = performance.now();
            console.log("jsRequestSocials took " + (wasmT1 - wasmT0) + " milliseconds.");
            console.log('jsRequestSocials data : ', data);
          })
          .catch(error => console.log('jsRequestSocials error : ', error));
  }
};

const wasmRequestSocials = (wasm) => {
    const {
      get_all_socials,
    } = wasm || {};
    const wasmT0 = performance.now();

    if(get_all_socials){
      get_all_socials()
      .then(data => {
        const wasmT1 = performance.now();
        console.log("wasmRequestSocials took " + (wasmT1 - wasmT0) + " milliseconds.");
        console.log('wasmRequestSocials data : ', data);
      })
      .catch(error => console.log('wasmRequestSocials error : ', error));
    }
};

const TasksUtilsMocker = {
    arrayBigTasks,
    jsRequestUsers,
    wasmRequestUsers,
    jsRequestPhotos,
    wasmRequestPhotos,
    jsRequestSocials,
    wasmRequestSocials,
};

export default TasksUtilsMocker;