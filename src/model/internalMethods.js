"use strict";

import warning from "warning";
import Observer from "../observer";

/**
 * 校验数据模型model的setState、getGlobalState、getModelState、emit、on、off
 * @param  {object} model 数据模型
 * @return
 */
export function validateInternalMethods(model){
  [ "setState", "getGlobalState","getModelState", "emit", "on", "off" ].map(method => {
  	warning(!model[method], `${method} will be overrided by mdv when model has connected with store.`);
  	model.__proto__[method] = ()=>{
  	  warning(true, "model ${model.toString()} hasn't connected with store.");
    };
  });
};

/**
 * 为数据模型model注入setState、getGlobalState、getModelState、emit、on、off方法
 * @param  {string} name  字符串
 * @param  {object} model 数据模型
 * @param  {object} store redux-store
 * @return
 */
export function setInternalMethods(name,model,store){
  // 获取全局state
  model.__proto__.getGlobalState = store.getState;

  // 获取某个数据模型的state
  model.__proto__.getModelState = (modelName)=>{
  	let state = model.getGlobalState();
  	return state[modelName];
  };

  // 获取当前数据模型的state
  model.__proto__.getState = (modelName)=>{
  	let state = model.getGlobalState();
  	return state[name];
  };

  // 更新当前数据模型model相关state
  model.__proto__.setState = (payload)=>{
    store.dispatch({
  	  type: `${name}/setState`,
      payload
    });
  };

  // 事件系统，为平级model通信用；何时解绑，避免内存泄漏？？？
  model.__proto__.emit = (event,data) => {
    store.dispatch({
  	  type: "emit",
  	  event,
      data
    });
  };

  model.__proto__.on = (event,callback) => {
  	store.dispatch({
  	  type: "on",
      event,
      name,
      callback
    });
  };

  model.__proto__.off = (event,callback) => {
    store.dispatch({
  	  type: "off",
  	  event,
      name,
      callback
    });
  };
  
  let Constructor = model.constructor;
  let propsModel = Constructor.propsModel;

  new Observer(model,[],(value,keys)=>{
    let keypath = "";
    let mainKey = keys[0];
    let state = {...model};
    let newState;
    keys.map(key=>{
      keypath += "[" + key + "]";

      if ( !newState ) newState = state[key];
      else newState = newState[key];
    });

    newState = value;

    store.dispatch({
      type: `${name}/setState`,
      payload: {
        [mainKey]: state[mainKey]
      },
      keypath: keypath
    });
  })

  // model的实例属性变更时注入state，state变更时回填给实例属性
  // for ( let prop in model ){
  // 	if ( !model.hasOwnProperty(prop) ) continue;

  //   const property = Object.getOwnPropertyDescriptor(model, prop)
  //   if (property && property.configurable === false) {
  //     continue
  //   };

  //   console.log(property)

  //   let getter = property && property.get;
  //   let setter = property && property.set;

  // 	Object.defineProperty(model,prop,{
  //     enumerable: true,
  // 	  get: function(){
  // 	  	let modelState = model.getState();
  //       let propModel = propsModel && propsModel[prop];
  //       let value = getter ? getter.call(model) : modelState[prop];

  // 	  	return propModel ? new propModel(value) : value;
  //       // propModel ? new propModel(modelState[prop],model) : modelState[prop];
  // 	  },
  // 	  set: function(value){
  //       let modelState = model.getState();
  //       if ( value !== modelState[prop] ){
  //         store.dispatch({
  //           type: `${name}/setState`,
  //           payload: {
  //             [prop]: value,
  //             key: prop
  //           }
  //         });
  //       };

  //       if (setter) {
  //         setter.call(model, value)
  //       };
  // 	  }
  // 	});
  // };
};
