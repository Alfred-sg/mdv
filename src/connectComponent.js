"use strict";

import * as ReactRedux from "react-redux";

import { getModel } from "./model/models";

function connectComponent(name){

  let model = getModel(name);

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
