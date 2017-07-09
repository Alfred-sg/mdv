"use strict";

import { connect } from "react-redux";

import { getModel } from "../model/models";

/**
 * 连通装饰器，将state和model注入组件
 * @param  {string} name model的标识符
 * @return {decorator}   由react-redux/connect创建的装饰函数
 */
function ModelComponent(name){
  let model = getModel(name);

  function mapStateToProps(state){
	  return {
	    state: state[name]// 促使视图重绘
	  };
  };

  function mapDispatchToProps(dispatch){
    return { model };
  };

  return connect(mapStateToProps,mapDispatchToProps);
};

export default ModelComponent;
