"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import { getModel } from "../model/models";

/**
 * 连通装饰器，将state和model注入组件
 * @param  {string} name model的标识符
 * @return {decorator}   由react-redux/connect创建的装饰函数
 */
function ModelComponent(name,withLifecyle){
  let model = getModel(name);

  function mapStateToProps(state){
	  return {
	    state: state[name]// 促使视图重绘
	  };
  };

  function mapDispatchToProps(dispatch){
    return { model };
  };

  let connectComponent = connect(mapStateToProps,mapDispatchToProps);

  function ComponentDecorator(UserComponent){
    class WrappedComponent extends Component{
      componentWillMount(){
        model.componentWillMount && model.componentWillMount();
      }

      componentDidMount(){
        model.componentDidMount && model.componentDidMount();
      }

      componentWillReceiveProps(){
        model.componentWillReceiveProps && model.componentWillReceiveProps(nextProps);
      }

      componentWillUpdate(nextProps){
        model.componentWillUpdate && model.componentWillUpdate(nextProps);
      }

      componentDidUpdate(prevProps){
        model.componentDidUpdate && model.componentDidUpdate(prevProps);
      }

      componentWillUnmount(){
        model.componentWillUnmount && model.componentWillUnmount();
      }

      render(){
        return <UserComponent {...this.props}/>
      }
    };

    return connectComponent(WrappedComponent);
  };

  if ( withLifecyle ) return ComponentDecorator;
  else return connectComponent
};

export default ModelComponent;
