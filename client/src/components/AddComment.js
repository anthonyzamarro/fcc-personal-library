import React, { Component } from 'react';

class AddComment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addCommentsForm: false,
			commentText: ""
		}

		this.addComment = this.addComment.bind(this);
		this.getCommentText = this.getCommentText.bind(this);
	}


	addCommentButton(id) {
		this.setState({
			addCommentsForm: !this.state.addCommentsForm,
			bookId: id
		})
	}

	getCommentText(t) {
		this.setState({
			commentText: t.target.value
		})
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
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		})
		.then(response => {
			this.props.comment(text);
		})
		.catch(err => console.log('addCOmment error', err))
	}

	render() {
		return (
			<div className="AddComment">
				<button onClick={e => this.addCommentButton(this.props.bookInfo._id)} className="book-btn">Add Comment</button>
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

export default AddComment;