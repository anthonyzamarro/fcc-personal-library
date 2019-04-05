import React, { Component } from "react";
import axios from 'axios';
// https://github.com/chimurai/http-proxy-middleware

class AddBookForm extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		// console.log('change happened')
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		// console.log('hello ' + this.state.value);
		// axios
		// .post('http://localhost:3000/api/books', this.state.value)
		// .then((response) => console.log('responding', response));
		this.props.postedResult(event)
		fetch('http://localhost:3000/api/books',{
		    method: 'POST',
		    body: JSON.stringify({
		      title: this.state.value
		    }),
		    headers: {"Content-Type": "application/json"}
		  })
		  .then(function(response){
		    return response.json()
		  })
		  .then(function(body){
		  	// this is undefined here
		  	// not reading component
		    console.log(this);

		    // this.props.postedResult(body)
		  })
		  .catch((err) => {
		  	console.log('fetch error', err)
		  })

		event.preventDefault();
	}

  render() {
    return(
      <div className="AddBookForm">
        <form onSubmit={this.handleSubmit}>
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