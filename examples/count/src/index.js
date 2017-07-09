import React, {Component} from "react";
import { ModelDecorator, ModelComponent, createApp } from "../../../src/index"; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

@ModelDecorator()
class count{
  count = 0
  add(){
  	this.count++;
  }
  minus(){
  	this.count--;
  }
};

@ModelComponent("count")
class Count extends Component {
  render(){
    const {model} = this.props;
    return (
      <div>
        <h2>{ model.count }</h2>
        <button key="add" onClick={() => { model.add(); }}>+</button>
        <button key="minus" onClick={() => { model.minus(); }}>-</button>
      </div>
    )
  }
};

const app = createApp();

app.model()
  .router(
    <Router>
      <Route path="/" component={Count}/>
    </Router>
  );

app.start("#root");
