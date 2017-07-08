"use strict";

import * as ReactRedux from "react-redux";

import {models} from "./register";

function connectComponent(name){

  let model = models[name];

  function mapStateToProps(state){
	  return {
	    state: state[name]// 促使视图重绘
	  };
  };

  function mapDispatchToProps(dispatch){
    return { model };
  };

  return ReactRedux.connect(mapStateToProps,mapDispatchToProps);
};

export default connectComponent
