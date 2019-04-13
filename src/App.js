import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd-mobile'
import axios from 'axios'
class App extends Component {
  componentDidMount(){
    axios.get('/data').then(res=>{
      console.log(res)
    })
  }
  render() {
    return (
      <div className="App">
      <Button>x</Button>
      </div>
    );
  }
}

export default App;
