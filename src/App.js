import React, { Component } from 'react';
// import logo from './logo.svg';
import IndexLayout from "./pages"
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path='/' component={IndexLayout}/>
        {/*<Route component={ NotFound }/>*/}
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
