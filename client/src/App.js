import React, { Component } from "react";
import AddBookForm  from './components/AddBookForm';

import { hot } from "react-hot-loader";

import "./App.css";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newBook: ""
		}
		this.postedNewBook = this.postedNewBook.bind(this);
	}

	postedNewBook(res) {
		console.log('IN postedNewBook', res);
		this.setState({
			newBook: res
		})
	}
  render(){
    return(
      <div className="App">
        <h1> Hello, World!!! </h1>
        <AddBookForm postedResult={this.postedNewBook} />
      </div>
    );
  }
}

export default hot(module)(App);