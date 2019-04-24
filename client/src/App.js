import React, { Component } from "react";
import AddBookForm  from './components/AddBookForm';
import BookList  from './components/BookList';
import Book from './components/Book';
import AddComment from './components/AddComment';
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
			commentFromIdForm: "",
		}
		this.postedNewBook = this.postedNewBook.bind(this);
		this.deleteAllBooks = this.deleteAllBooks.bind(this);
		this.viewOneBook = this.viewOneBook.bind(this);
		this.removeBookFromList = this.removeBookFromList.bind(this);
		this.addComment = this.addComment.bind(this);
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

	addComment(res) {
		console.log('addCommentById', res)
		this.setState({
			commentFromIdForm: res
		})
	}



  render(){
    return(
      <div className="App">
	      <div className="background">
	        <h1> Personal Libary </h1>
			<AddBookForm postedResult={this.postedNewBook} />
	      </div>
	        <div className="container">
	        	<h3>Book List</h3>
		        <BookList 
		        	addedBook={this.state.newBook}
		        	shouldDelete={this.state.deleteAll}
		        	viewOneFromList={this.viewOneBook}
		        	deleteOneFromList={this.state.deleteOneId}
		        />
		        <hr />
	        	<div className="form-container">
		       	 	<CommentByIdForm 
		        		comment={this.addComment}
		       	 	/>
	        	</div>
	        	<div className="book-container">
			        {this.state.viewBook &&
			        	<div>
			        		<Book 
			        			deleteOneBook={this.removeBookFromList}
			        			bookInfo={this.state.singleBook}
			        			commentFromId={this.state.commentFromIdForm}
			        		/>
			        		<AddComment 
			        			bookInfo={this.state.singleBook}
			        			comment={this.addComment}
			        		/>
			        	</div>
			    	}
	        	</div>
	        	<hr />
		    	<DeleteAllButton delete={this.deleteAllBooks}/>
		    </div>
      </div>
    );
  }
}

export default hot(module)(App);