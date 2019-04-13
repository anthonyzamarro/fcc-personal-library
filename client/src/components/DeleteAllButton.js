import React, { Component } from 'react'

class DeleteAllButton extends Component {
	constructor(props) {
		super(props);

		this.deleteBooks = this.deleteBooks.bind(this);
	}

	deleteBooks(e) {
		fetch('/api/books', {
			method: 'DELETE',
		    body: JSON.stringify({
		      id: 'TERMINATE'
		    }),
		    headers: {"Content-Type": "application/json"}
		  })
		  .then((response) => response)
		  .then(res => this.props.delete())
		  .catch(err => console.log('delete error', err))
	}




	render() {
		return (
			<button onClick={e => this.deleteBooks(e)} className="delete-all-btn">Delete All Books</button>
		);
	}
}

export default DeleteAllButton;