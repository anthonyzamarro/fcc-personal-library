import React, { Component } from 'react';

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addCommentsForm: false,
			commentText: "",
			// commentList: this.props.bookInfo.comments
		}

		this.deletOne = this.deletOne.bind(this);
		this.addCommentButton = this.addCommentButton.bind(this);
		this.addComment = this.addComment.bind(this);
		this.getCommentText = this.getCommentText.bind(this);

	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.props.commentFromId !== prevProps.commentFromId) {
	// 		this.setState({
	// 			commentList: this.state.commentList.concat(this.props.commentFromId)
	// 		})
	// 	}
	// }

	addCommentButton(id) {
		this.setState({
			addCommentsForm: !this.state.addCommentsForm,
			bookId: id
		})
	}

	getCommentText(e) {
		this.setState({commentText: e.target.value})
	}

	addComment(e) {
		e.preventDefault();
		let text = this.state.commentText;
		fetch(`/api/books/${this.props.bookInfo._id}`, {
			method: "POST",
			body: JSON.stringify({
		      comments: text
		    }),
		    headers: {"Content-Type": "application/json"}
		})
		.then(res => res)
		.then(response => {
			if (response.status == 200) {
				this.setState({
					commentList: this.state.commentList.concat(text)
				});
			}
		})
		.catch(err => console.log('addCOmment error', err))
	}

	deletOne(bookId) {
		console.log('deletOne id', this.props)
		fetch(`/api/books/${bookId}`, {
			method: 'DELETE',
			body: JSON.stringify({
		      id: bookId
		    }),
		    headers: {"Content-Type": "application/json"}
		})
		.then(response => response)
		.then(res => this.props.deleteOneBook(bookId))
		.catch(err => console.log('deletOne err', err))
	}

	render() {
		console.log('Book constructor', this.props);
		let bookComments = this.props.bookInfo.comments.length <= 0 
		? '' : this.props.bookInfo.comments.map((comment, key) => {
			return <li key={key}>{comment}</li>
		});
		return (
			<div className="Book">
				<h3>Book</h3>
				<div className="book-title">Title:{this.props.bookInfo.title}</div>
				<div className="book-comments">Comments:<br/>{bookComments}</div>
				<div className="book-id">ID:{this.props.bookInfo._id}</div>
				{this.props.bookInfo !== "" && <button onClick={e => this.deletOne(this.props.bookInfo._id)}>Delete book</button>}
				{this.props.bookInfo !== "" && <button onClick={e => this.addCommentButton(this.props.bookInfo._id)}>Add Comment</button>}
				{this.state.addCommentsForm && 
					<form onSubmit={this.addComment}>
						<input type="text" onChange={this.getCommentText} maxLength="50" />
						<input type="submit" value="add" />
					</form>
				}
			</div>
		)
	}
}

export default Book;