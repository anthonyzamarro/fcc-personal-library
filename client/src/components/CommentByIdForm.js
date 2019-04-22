import React, { Component } from 'react';

class CommentByIdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId: "",
			bookComment: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(e) {
		fetch(`http://localhost:3000/api/books/${this.state.bookId}`, {
			method: 'POST',
			body: JSON.stringify({
				comments: this.state.bookComment
			}),
			headers: {"Content-Type": "application/json"}

		})
		.then(res => res)
		.then(response => this.props.commentById(this.state.bookComment))
		.catch(err => console.log('CommentByIdForm err', err))
		e.preventDefault();
	}

	render() {
		return (
			<div className="CommentByIdForm">
				<h3>Comment By ID</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
					Book Id:
					<br/>
						<input 
							type="text" 
							name="bookId" 
							onChange={this.handleChange}
							minLength="5"
							maxLength="50" 
							placeholder="Book Id"
						/>
					</label>
					<br/>
					<label>
					Book Comment:
					<br/>
						<input 
							type="text" 
							name="bookComment" 
							onChange={this.handleChange} 
							minLength="5"
    						maxLength="50"
							placeholder="Book Comment"
						/>
					</label>
				<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default CommentByIdForm;