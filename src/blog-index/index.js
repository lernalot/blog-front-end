import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
export default class BlogContainer extends React.Component {
	constructor(){
		super();
		this.state = {};
	}

	render(){
		return(
			<React.Fragment>
				<div>博客的首页，通过container变量变换博客内容</div>
			</React.Fragment>
		)
	}
}