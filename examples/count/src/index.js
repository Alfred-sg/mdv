import React from "react";
import {store,ModelDecorator,connect,createApp} from "../../../src/index"; 
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
	//console.log(props)
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

const app = createApp();

app.model("count");

app.router(
  <Router>
    <Route path="/" component={Count}/>
  </Router>
);

app.start("#root");
