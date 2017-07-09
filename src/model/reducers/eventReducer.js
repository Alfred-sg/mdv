"use strict";

// 以redux方式构建事件系统，在全局state的event属性中缓存事件名和绑定函数
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
