"use strict";

import ReactRedux from "react-redux";

import ModelResigter from "./ModelResigter";

function connectComponent(name){
  let model = ModelResigter[name];

  function mapStateToProps(state){
	return {
	  state: state[name]
	};
  };

  function mapDispatchToProps(dispatch){
    return { model };
  };

  return ReactRedux.connect(mapStateToProps,mapDispatchToProps);
};

export default connectComponent
