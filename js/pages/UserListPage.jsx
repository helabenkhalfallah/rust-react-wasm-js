import React, { Component } from "react";
import {
  Button,
} from "antd";
import data from './MockData';

class UserListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasm: {},
    };
  }

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    import("../../pkg/index.js")
      .then((wasm) => {
        if (wasm) {
          this.setState({
            wasm,
          });
        }
      })
      .catch(console.error);
  };

  render() {
    const { wasm = {} } = this.state;
    const {
      greet,
      collect_numbers,
      transfom_me
    } = wasm || {};
    console.log("wasm : ", wasm);
    if(transfom_me){
      console.log("data : ", data);
    
      const jsMapT0 = performance.now();
      const resultJSMapped = data
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
      console.log("resultJSMapped : ", resultJSMapped); /* */

      const wasmT0 = performance.now();
      const resultWASMMapped = transfom_me(data);
      const wasmT1 = performance.now();
      console.log("Call to Rust WASM transfom_me took " + (wasmT1 - wasmT0) + " milliseconds.");
      console.log("resultWASMMapped : ", resultWASMMapped);
    }

    if(collect_numbers){
      const entries = [
        ...[...Array(40000)].map(e=>~~(Math.random() * 4000)),
      ];
      console.log("entries : ", entries);

      const jsFilterT0 = performance.now();
      const resultFilter = entries.filter(item => typeof item === 'number')
      const jsFilterT1 = performance.now();
      console.log("Call to JS filter took " + (jsFilterT1 - jsFilterT0) + " milliseconds.")
      console.log("resultFilter : ", resultFilter); /* */

      const wasmT0 = performance.now();
      const resultWasm = collect_numbers(entries);
      const wasmT1 = performance.now();
      console.log("Call to Rust collect_numbers took " + (wasmT1 - wasmT0) + " milliseconds.");
      console.log("resultWasm : ", resultWasm);
    }
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div>
              { (greet) && (
                <Button
                  onClick={() => wasm.greet()}
                >
                  Click Me
                </Button>
              ) }
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default UserListPage;
