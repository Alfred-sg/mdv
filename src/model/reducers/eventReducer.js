"use strict";

// 以redux方式构建事件系统，在全局state的event属性中缓存事件名和绑定函数
const eventReducers = {
  "on": (state,action) => {
  	let { event, name="global", callback } = action;
  	let modelEvents = state[event] || {};
    let callbacks = modelEvents[name] || ( modelEvents[name] = [] )
  	callbacks.push(callback);

  	return {
  	  ...state,
  	  [event]: modelEvents
  	};
  },
  "emit": (state,action) => {
  	let { event, data } = action;
  	let modelEvents = state[event];

  	Object.keys(modelEvents).map(name => {
      modelEvents[name].map(cb => {
        cb(data);
      });
  	});

  	return state;
  },
  "off": (state,action) => {
  	let { event, name, callback } = action;

  	if ( !event && !name && !callback ) return {};

  	if ( !name && !callback ){
  	  delete state[event];
  	  return state;
  	};

    if ( !event && !callback ){
      Object.keys(state).map(event => {
        delete state[event][name];
        if ( !Object.keys(state[event]).length ) delete state[event];
      });
      return state;
    };

    if ( event && name ){
      delete state[event][name];
      if ( !Object.keys(state[event]).length ) delete state[event];
      return state;
    };

    if ( event && callback ){
      Object.keys(state[event]).map(name => {
        state[event][name] = state[event][name].filter(cb => cb!==callback);
        if ( state[event][name].length ) delete state[event][name];
      });
      
      if ( !Object.keys(state[event]).length ) delete state[event];
      
      return state;
    };

    if ( name && callback ){
      Object.keys(state).map(event => {
        state[event][name] = state[event][name].filter(cb => cb!==callback);
        if ( state[event][name].length ) delete state[event][name];
        if ( !Object.keys(state[event]).length ) delete state[event];
      });
      return state;
    };


    Object.keys(state).map(event => {
      Object.keys(state[event]).map(name => {
        state[event][name] = state[event][name].filter(cb => cb!==callback);
        if ( state[event][name].length ) delete state[event][name];
      });
      
      if ( !Object.keys(state[event]).length ) delete state[event];
    });

    return state;
  },
};

function eventReducer( state = {}, action ){
  const handler = eventReducers[action.type];
  return handler ? handler(state,action) : state;
};

export default {
  event: eventReducer
};
