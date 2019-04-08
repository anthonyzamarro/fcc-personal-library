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
			singleBook: "",
			deleteOneId: ""
		}
		this.postedNewBook = this.postedNewBook.bind(this);
		this.deleteAllBooks = this.deleteAllBooks.bind(this);
		this.viewOneBook = this.viewOneBook.bind(this);
		this.removeBookFromList = this.removeBookFromList.bind(this);
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

	viewOneBook(res) {
		this.setState({
			singleBook: res
		});
	}

	removeBookFromList(res) {
		this.setState({
			deleteOneId: res
		})
	}



  render(){
    return(
      <div className="App">
        <h1> Personal Libary </h1>
        <Book 
        	deleteOneBook={this.removeBookFromList}
        	bookInfo={this.state.singleBook} 
        />
        <AddBookForm postedResult={this.postedNewBook} />
        <BookList 
        	addedBook={this.state.newBook}
        	shouldDelete={this.state.deleteAll}
        	viewOneFromList={this.viewOneBook}
        	deleteOneFromList={this.state.deleteOneId}
        />
        <DeleteAllButton delete={this.deleteAllBooks}/>
      </div>
    );
  }
}

export default hot(module)(App);