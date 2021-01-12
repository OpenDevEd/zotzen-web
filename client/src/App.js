//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';




class App extends Component{
  

constructor(props) {
  super(props);
  this.state = { apiResponse: "" };
  this.create = { createRespone: "" };
 
}

callAPI() {
  fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}
//under development not complete
createAPI(){
  fetch("http://localhost:9000/createAPI")
  .then(res => res)
  .then(res => this.setState({ createRespone: res }));

}






componentWillMount() {
  this.callAPI();
  this.createAPI();
}



render(){
      
  
  
  return(


      <div>
      <h3>welcome to React</h3>
      <p className="App-intro">;{this.state.apiResponse}</p>
      <p className="App-intro">;{this.create.createResponse}</p>
      </div>
      );
  }
}

export default App;
