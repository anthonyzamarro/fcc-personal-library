import React, { Component } from "react";
import AddBookForm  from './components/AddBookForm';
import BookList  from './components/BookList';
import Book from './components/Book';
import DeleteAllButton from './components/DeleteAllButton';

import { hot } from "react-hot-loader";

import "./App.css";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newBook: "",
			deleteAll: false,
			singleBook: ""
		}
		this.postedNewBook = this.postedNewBook.bind(this);
		this.deleteAllBooks = this.deleteAllBooks.bind(this);
		this.oneBook = this.oneBook.bind(this);
	}

	postedNewBook(res) {
		this.setState({
			newBook: res
		})
	}

	deleteAllBooks(res) {
		this.setState(prevState => ({
			deleteAll: !this.state.deleteAll
		}));
	}

	oneBook(res) {
		this.setState({
			singleBook: res
		});
	}

  render(){
    return(
      <div className="App">
        <h1> Personal Libary </h1>
        <Book bookInfo={this.state.singleBook} />
        <DeleteAllButton delete={this.deleteAllBooks}/>
        <AddBookForm postedResult={this.postedNewBook} />
        <BookList 
        	addedBook={this.state.newBook}
        	shouldDelete={this.state.deleteAll}
        	oneFromList={this.oneBook}
        />
      </div>
    );
  }
}

export default hot(module)(App);