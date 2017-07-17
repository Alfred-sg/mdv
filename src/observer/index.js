"use strict";

import { hasProto, def, isObject } from "../utils";

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method){
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(){
    let i = arguments.length;
    const args = new Array(i);
    while( i-- ){
      args[i] = arguments[i];
    };
    const result = original.apply(this,args);
    const ob = this.__ob__;
    let inserted;
    switch(method){
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    };
    if ( inserted ) new Observer(inserted);

    ob.notify(ob,ob.keypath);
    return result;
  });
});

export default class Observer{
  constructor(vm,keypath = [],...subs){
  	this.subs = subs;
  	this.keypath = keypath;
  	if ( !keypath.length ) this.rootData = true;
  	def(vm,"__ob__",this);
    def(vm,"keypath",keypath);
    if (Array.isArray(vm)) {
      this._defineArrayReactive(vm);
    } else {
      this.walk(vm);
    };
  }

  // 观察对象的属性或方法
  walk(obj){
    const keys = Object.keys(obj);
    keys.map(key => {
      this._defineReactive(obj,key,obj[key]);
    });
  }

  notify(val,keypath){
  	this.subs.map((sub) => {
  	  sub(val,keypath);
  	});
  }

  _defineReactive(obj,key,val){
  	const self = this;
  	const property = Object.getOwnPropertyDescriptor(obj, key);
  	if (property && property.configurable === false) return;

    const getter = property && property.get;
    const setter = property && property.set;

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter(){
        const value = getter ? getter.call(obj) : val;
        return value;
      },
      set: function reactiveSetter(newVal){
        const value = getter ? getter.call(obj) : val;
        if ( newVal === value || (newVal !== newVal && value !== value) ){
          return;
        };
        if ( setter ){
          setter.call(obj, newVal);
        } else {
          val = newVal;
        };

        self.notify(newVal,[...self.keypath,key]);
      }
    });

    if ( Array.isArray(obj[key]) ){
      new Observer(obj[key],[...self.keypath,key],...self.subs);
    }else if( isObject(obj[key]) ){
      new Observer(obj[key],[...self.keypath,key],...self.subs);
    };
  }

  _defineArrayReactive(arr){
    const self = this;

  	if ( hasProto ){
  	  arr.__proto__ = arrayMethods;
  	}else{
	    const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	    arrayKeys.map(key => {
	  	  def(arr,key,arrayMethods[key]);
	    });
  	};

  	arr.map((item,index)=>{
      if ( Array.isArray(item) ){
        new Observer(item,[...self.keypath,index],...self.subs);
      }else if( isObject(item) ){
        new Observer(item,[...self.keypath,index],...self.subs);
      };
  	});
  }

};
