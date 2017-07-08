import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {store,ModelDecorator,connect} from "../../../src/index"; 
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {routerMiddleware} from "react-router-redux";

@ModelDecorator("count")
class CountModel{
  constructor(props={a:1,...{b:2}}){
  	this.count = 0;
  }
  add(){
  	this.setState({
  	  count: this.count+1
  	})
  }
  minus(){
  	this.setState({
  	  count: this.count-1
  	})
  }
};

let Count = (props)=>{
	console.log(props)
  const {model} = props;
  return (
  	<div>
      <h2>{ model.count }</h2>
      <button key="add" onClick={() => { model.add(); }}>+</button>
      <button key="minus" onClick={() => { model.minus(); }}>-</button>
    </div>
  )
};

Count = connect("count")(Count);

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Count}/>
    </Router>
  </Provider>
,document.getElementById("root"));
