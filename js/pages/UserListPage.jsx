import React, { Component } from "react";
import {
  Button,
} from "antd";
import {
  TasksUtilsMocker,
}from '../utils'

const {
  arrayBigTasks,
  jsRequestUsers,
  wasmRequestUsers,
  jsRequestPhotos,
  wasmRequestPhotos,
  jsRequestSocials,
  wasmRequestSocials,
} = TasksUtilsMocker;

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
    } = wasm || {};
    console.log("wasm : ", wasm);
  
    // jsRequestUsers(wasm);
    // wasmRequestUsers(wasm);

    // jsRequestPhotos(wasm);
    // wasmRequestPhotos(wasm);

    jsRequestSocials(wasm);
    wasmRequestSocials(wasm);

    // arrayBigTasks(wasm);

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
