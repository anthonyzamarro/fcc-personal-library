import React, { Component } from 'react';

class Book extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('Book constructor', this.props);
		return (
			<div className="Book">
				{this.props.bookInfo.title}
				{this.props.bookInfo.comments}
			</div>
		)
	}
}

export default Book;