"use strict";

const eventReducers = {
  "on": (state,action) => {
  	let { event, callback } = action;
  	let callbacks = state[event] || [];
  	callbacks.push(callback);

  	return {
  	  ...state,
  	  [event]: callbacks
  	};
  },
  "emit": (state,action) => {
  	let { event, data } = action;
  	let callbacks = state[event];

  	callbacks.map(cb => {
  	  cb(data);
  	});

  	return state;
  },
  "off": (state,action) => {
  	let { event, callback } = action;

  	if ( !event && !callback ) return {};

  	if ( !callback ){
  	  delete state[event];
  	  return state;
  	};

  	let callbacks = state[event];
  	callbacks = callbacks.filter(cb => cb!==callback);

  	if ( !callbacks.length ){
  	  delete state[event];
  	  return state;
  	};

  	return {
  	  ...state,
  	  [event]: callbacks
  	};
  },
};

function eventReducer( state = {}, action ){
  const handler = eventReducers[action.type];
  return handler ? handler(state,action) : state;
};

export default {
  event: eventReducer
};
