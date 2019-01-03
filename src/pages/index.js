import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import BlogList from "../blog-list";
import BlogIndex from "../blog-index";
export default class IndexLayOut extends React.Component {
	constructor(){
		super();
		this.state = {};
	}

	render(){
		return(
			<React.Fragment>
				<div>index</div>
				<Switch>
					<Route exact path="/list" component={ BlogList }/>
					<Route exact path="/blog" component={ BlogIndex }/>
				</Switch>
			</React.Fragment>
		)
	}
}