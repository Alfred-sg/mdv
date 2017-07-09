"use strict";

import { getModel } from "./models";
import { injectReducer } from "./reducer";
import { setInternalMethods } from "./internalMethods";

function createModelReducer(name,model){
  let initialState = {};

  for ( let prop in model ){
  	if ( !model.hasOwnProperty(prop) || typeof model[prop] === "function" ) continue;
    initialState[prop] = model[prop];
  };

  let reducers = {
	[`${name}/setState`]: (state,action) => {
      let {payload} = action;

      return {
        ...state,
        ...payload
      };
    }
  };

  let reducer = ( state = initialState, action ) => {
    const handler = reducers[action.type];
    return handler ? handler(state,action) : state;
  };

  return reducer;
};

function replaceReducer(name,model,store){
  let modelReducer = createModelReducer(name,model);
  let reducer = injectReducer({[name]: modelReducer});

  store.replaceReducer(reducer);
};

function mapStateToModel(name,model,store){
  store.subscribe(() => {
  	let state = store.getState();
  	let modelState = state[name];

  	for (let prop in model){
	  if ( !model.hasOwnProperty(prop) ) continue;
	  model[prop] = modelState[prop];
	};
  });
};

function publishModel(name,store){
  let model = getModel(name);

  setInternalMethods(name,model,store);

  replaceReducer(name,model,store);

  mapStateToModel(name,model,store);
};

export default publishModel;
