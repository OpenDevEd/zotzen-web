//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
let lib = require("zotzen-lib");
const result = lib.create();
//console.log(`The result is: ${JSON.stringify(result)}`);



class App extends Component{



constructor(props) {
  super(props);
  this.state = { apiResponse: "" };
}

callAPI() {
  fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
  this.callAPI();
}

render(){
      return(
      <div>
      <h3>welcome to React</h3>
      <p className="App-intro">;{this.state.apiResponse}</p>
      <p>{`The result is: ${JSON.stringify(result)}`}</p>
      </div>
      );
  }
}

export default App;
