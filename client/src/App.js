import React, { Component } from "react";
import AddBookForm  from './components/AddBookForm';
import BookList  from './components/BookList';
import Book from './components/Book';

import CommentByIdForm from './components/CommentByIdForm';
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
			viewBook: false,
			deleteOneId: "",
			commentFromIdForm: ""
		}
		this.postedNewBook = this.postedNewBook.bind(this);
		this.deleteAllBooks = this.deleteAllBooks.bind(this);
		this.viewOneBook = this.viewOneBook.bind(this);
		this.removeBookFromList = this.removeBookFromList.bind(this);
		this.addCommentById = this.addCommentById.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	postedNewBook(res) {
		this.setState({
			newBook: res
		});
	}

	deleteAllBooks(res) {
		this.setState(prevState => ({
			deleteAll: !this.state.deleteAll
		}));
	}

	viewOneBook(res) {
		this.setState({
			singleBook: res,
			viewBook: true
		});
	}

	deleteBook(res) {
		this.setState({
			singleBook: "",
			viewBook: false
		})
	}

	removeBookFromList(res) {
		this.setState({
			deleteOneId: res
		});
		this.deleteBook(null)
	}

	addCommentById(res) {
		this.setState({
			commentFromIdForm: res
		})
	}



  render(){
    return(
      <div className="App">
        <h1> Personal Libary </h1>
	        <div className="container">
	        	<div className="form-container">
		        <AddBookForm postedResult={this.postedNewBook} />
		        <CommentByIdForm 
		        	commentById={this.addCommentById}
		        />
	        	</div>
	        	<div className="book-container">
		        <BookList 
		        	addedBook={this.state.newBook}
		        	shouldDelete={this.state.deleteAll}
		        	viewOneFromList={this.viewOneBook}
		        	deleteOneFromList={this.state.deleteOneId}
		        />
		        {this.state.viewBook && 
		        	<Book 
		        		deleteOneBook={this.removeBookFromList}
		        		bookInfo={this.state.singleBook}
		        		commentFromId={this.state.commentFromIdForm}
		        	/>
		    	}
	        	</div>
		    </div>
		    <DeleteAllButton delete={this.deleteAllBooks}/>
      </div>
    );
  }
}

export default hot(module)(App);