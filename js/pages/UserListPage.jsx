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
    console.log("wasm : ", wasm);
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div>
              { (wasm && wasm.greet) && (
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
