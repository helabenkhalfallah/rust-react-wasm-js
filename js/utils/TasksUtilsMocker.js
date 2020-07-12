import MockData from './MockData';

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


const TasksUtilsMocker = {
    arrayBigTasks,
};

export default TasksUtilsMocker;