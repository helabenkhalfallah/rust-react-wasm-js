import React, { Component } from "react";
import {
  Button,
} from "antd";
import {
  TasksUtilsMocker,
}from '../utils'

const {
  arrayBigTasks,
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
      get_all_users,
    } = wasm || {};
    console.log("wasm : ", wasm);
    
    // arrayBigTasks(wasm);
    if(get_all_users){
      get_all_users()
      .then(data => console.log('data : ', data))
      .catch(error => console.log('error : ', error));
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
