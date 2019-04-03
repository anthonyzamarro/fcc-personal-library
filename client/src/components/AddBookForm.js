import React, { Component } from "react";


class AddBookForm extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		console.log('change happened')
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		console.log('hello ' + this.state.value);
		event.preventDefault();
	}

  render(){
    return(
      <div className="AddBookForm">
        <form action="/api/books" method="post"  onSubmit={this.handleSubmit}>
        <label>
        	Book Title:
        	<input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddBookForm;