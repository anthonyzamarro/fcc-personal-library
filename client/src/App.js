import React, { Component } from "react";
import AddBookForm  from './components/AddBookForm';

import { hot } from "react-hot-loader";

import "./App.css";


class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World!!! </h1>
        <AddBookForm />
      </div>
    );
  }
}

export default hot(module)(App);