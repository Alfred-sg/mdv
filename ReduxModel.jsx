"use strict";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class ReduxModel{
  constructor(name,model){
  	this.name = name;
  	this._bindActionCreatorsFlag = false;
  	this._initialState = {};
  	this._model = this._createModel(model);
  	this._actions = this._createActions();
  	this.reducer = this._createReducer(model);
  	this.connect = this._createConnect();
  }

  _createModel(model){
  	let name = this.name;
  	let initialState = this._initialState;

  	let setState = (state) => {
  	  let bindActionCreatorsFlag = this._bindActionCreatorsFlag;
  	  let actions = this._actions;
  	  if ( !bindActionCreatorsFlag ){
  	  	return;
  	  };

      actions[`${name}/setState`](state);
    };

    for ( let prop in model ){
      initialState[prop] = model[prop];
    };

    model.__proto__.setState = setState

    return model;
  }

  _createActions(){
  	let name = this.name;

  	return {
  	  [`${name}/setState`]: (payload) => {
        return {
      	  type: `${name}/setState`,
      	  payload
        };
      },
  	};
  }

  _createReducer(model){
  	let name = this.name;

  	let reducers = {
  	  [`${name}/setState`]: (state,action) => {
	    let {payload} = action;

	    return {
	      ...state,
	      ...payload
	    };
	  },
  	};

  	let reducer = ( state = this._initialState, action ) => {
  		console.log(state)
	  const handler = reducers[action.type];
	  return handler ? handler(state,action) : state;
	};

	return {
	  [name]: reducer
	};
  }

  _createConnect(){
  	let name = this.name;
  	let _bindActionCreators = this.bindActionCreators.bind(this);
  	let _mapStateToModel = this._mapStateToModel.bind(this);
  	let model = this._model;

  	function mapStateToProps(state){
  	  _mapStateToModel(state[name])

	  return {
	    state:state[name]
	  };
	};

	function mapDispatchToProps(dispatch){
	  _bindActionCreators(dispatch);
	  
      return {
      	model
      };
    };

    return connect(mapStateToProps,mapDispatchToProps);
  }

  _mapStateToModel(state){
  	let model = this._model;
  	Object.keys(state).map(key=>{
  	  model[key] = state[key];
    });
  }

  bindActionCreators(dispatch){
  	this._bindActionCreatorsFlag = true;
  	this._actions = bindActionCreators(this._actions,dispatch);
  }

};

export default ReduxModel
