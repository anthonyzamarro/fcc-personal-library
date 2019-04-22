import React, { Component } from 'react';

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addCommentsForm: false,
			commentText: ""
		}

		this.deletOne = this.deletOne.bind(this);
		this.addCommentButton = this.addCommentButton.bind(this);
		this.addComment = this.addComment.bind(this);
		this.getCommentText = this.getCommentText.bind(this);

	}

	componentDidUpdate(prevProps) {
		console.log('prevProps',prevProps, 'props', this.props);
	}

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
		fetch(`http://localhost:3000/api/books/${this.props.bookInfo._id}`, {
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
		fetch(`http://localhost:3000/api/books/${bookId}`, {
			method: 'DELETE',
			body: JSON.stringify({
		      id: bookId
		    }),
		    headers: {
		    	"Accept": "application/json",
		    	"Content-Type": "application/json"
		    }
		})
		.then(response => {
			if (response.ok) {
		    return response.json()
		  }
		})
		.then(res => {
			console.log(this.props)
			this.props.deleteOneBook(res._id)
		})
		.catch(err => console.log('deletOne err', err))
		// console.log(this.props.bookInfo)
	}

	render() {
		let bookComments = this.props.bookInfo.comments.length <= 0 
		? '' : this.props.bookInfo.comments.map((comment, key) => {
			return <li key={key}>{comment}</li>
		});
		return (
			<div className="Book">
				<h3>Book</h3>
				<div className="book-info">
					<div className="book-title">Title:{this.props.bookInfo.title}</div>
					<div className="book-comments">Comments:<br/>{bookComments}</div>
					<div className="book-id">ID:{this.props.bookInfo._id}</div>
				</div>
				{this.props.bookInfo !== "" && <button onClick={e => this.deletOne(this.props.bookInfo._id)}>Delete book</button>}
				{this.props.bookInfo !== "" && <button onClick={e => this.addCommentButton(this.props.bookInfo._id)}>Add Comment</button>}
				{this.state.addCommentsForm && 
					<form onSubmit={this.addComment}>
						<input 
							type="text" 
							onChange={this.getCommentText} 
							minLength="1"
        					maxLength="50"
						/>
						<input type="submit" value="add" />
					</form>
				}
			</div>
		)
	}
}

export default Book;