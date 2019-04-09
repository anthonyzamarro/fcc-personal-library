// import React, { Component } from 'react';

// class GetBookByTitle extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			bookId: ""
// 		}

// 		this.handleChange = this.handleChange.bind(this);
// 		this.getBook = this.getBook.bind(this);
// 	}

// 	handleChange(e) {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		})
// 	}

// 	// getBook(e) {
// 	// 	fetch(`http://localhost:3000/api/books/${this.state.bookId}`, {
// 	// 		method: "GET",
// 	// 		body: JSON.stringify({
// 	// 	      id: bookId
// 	// 	    }),
// 	// 	    headers: {"Content-Type": "application/json"}
// 	// 	})
// 	// 	.then(res => res)
// 	// 	.then(response => console.log('getBook response', response))
// 	// 	.catch(err => console.log('getBook err', err))

// 	// 	e.preventDefault();
// 	// }



// 	render() {
// 		return (
// 			<div className="GetBookByTitle">
// 				<form onSubmit={this.getBook}>
// 				<label>
// 				BookId:<br/>
// 					<input type="text" name="bookId" onChange={this.handleChange} maxLength="80" placeholder="enter book ID"/>
// 				</label>
// 					<input type="submit" value="Get Book" />
// 				</form>
// 			</div>
// 		);
// 	}
// }

// export default GetBookByTitle;