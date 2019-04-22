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
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		const val = this.state.value;
		fetch('http://localhost:3000/api/books',{
		    method: 'POST',
		    body: JSON.stringify({
		      title: val
		    }),
		    headers: {
		    	"Accept": "application/json",
		    	"Content-Type": "application/json"
		    }
		  })
		  .then((response) => {
		  	// returns a promise
		  	// https://stackoverflow.com/questions/36840396/react-fetch-gives-an-empty-response-body
		  	if (response.ok) {
			    return response.json()
			  }
		  })
		  .then((body) => {
		  	/*
	  		problem; 'this' is undefined and doesnt
	  		recognize current component

	  		solution: either assign 'this' to variable
	  		outside of scope and use inside of function() {...}
	  		OR use arrow function which creates lexical scope in which
	  		'this' will refer to the current scope
		  	*/
		  	console.log(body);
		    this.props.postedResult(body);
		  })
		  .catch((err) => {
		  	console.log('fetch error', err)
		  });

		event.preventDefault();
	}

  render() {
    return(
      <div className="AddBookForm">
      <h3>Add a Book</h3>
        <form onSubmit={this.handleSubmit}>
        <label>
        	Book Title:
        	<br />
        	<input 
        		type="text" 
        		value={this.state.value} 
        		onChange={this.handleChange}
        		minLength="1"
        		maxLength="50"
        	/>
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddBookForm;