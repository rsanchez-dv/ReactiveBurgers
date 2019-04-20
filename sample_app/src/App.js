import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Person from './Person/Person'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, react here</h1>
        <Person name="max"/>
        <Person name="asd"/>
        <Person name="uwu" msg="ooo"/>
      </div>
    );
  }
}

export default App;
