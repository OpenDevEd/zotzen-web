import logo from './logo.svg';
import './App.css';
import { Component } from 'react';



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
      
      </div>
      );
  }
}

export default App;
