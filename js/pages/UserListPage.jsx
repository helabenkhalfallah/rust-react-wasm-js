import React, { Component } from "react";
import {
  Button,
} from "antd";

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
      collect_numbers,
      greet
    } = wasm || {};
    console.log("wasm : ", wasm);
    if(collect_numbers){
      const entries = [
        ...'abcdefghijklmnopqrstuvwxyz'.split(''),
        ...[...Array(400000)].map(e=>~~(Math.random() * 4000)),
        ...'abcdefghijklmnopqrstuvwxyz'.split(''),
      ];
      console.log("entries : ", entries);

      const jsFilterT0 = performance.now();
      const resultFilter = entries.filter(item => typeof item === 'number')
      const jsFilterT1 = performance.now();
      console.log("Call to JS filter took " + (jsFilterT1 - jsFilterT0) + " milliseconds.")
      console.log("resultFilter : ", resultFilter);

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
