import React, {Component} from "react";
import { createLogger } from 'redux-logger';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { ModelDecorator, ModelComponent, createApp } from "../../../src/index"; 

@ModelDecorator()
class count{
  count = 0
  componentWillMount(){
    this.on("test",a=>{console.log(a)});
  }
  add(){
  	this.count++;this.emit("test","test event");
  }
  minus(){
  	this.count--;this.off("test");console.log(this.getGlobalState());
  }
};

@ModelComponent("count",true)
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

const app = createApp({
  extraMiddlewares: [createLogger()]
});

app.model()
.router(
  <Router>
    <Route path="/" component={Count}/>
  </Router>
)
.start("#root");
