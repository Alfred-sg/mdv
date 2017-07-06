"use strict";

let events = {};

function on(name,callback){
  if ( typeof callback !== "function" ){
    throw new TypeError("callback should be a function.")
  };
  let list = events[name] || (events[name] = []);
  list.push(callback);
  return Event;
};

function off(name,callback){
  if (!(name || callback)) {  
    events = {};
    return Event;
  };

  let list = events[name];
  if (list) {
    if (callback) {
      list = list.filter(fn => fn!==callback);
    } else {  
      delete events[name];
    }; 
  };  
  
  return Event; 
};

function emit(name,message){
  if ( !events[name] ) return Event;

  events[name].map(fn => {
  	fn(message);
  });

  return Event;
};

const Event = {
  on: on,
  off: off,
  emit: emit,
};

export default Event
