"use strict";

import document from 'global/document';

const _toString = Object.prototype.toString;

export function isHTMLElement(node){
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
};

export function querySelector(container){
  return document.querySelector(container)
};

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export const hasProto = '__proto__' in {};

export function def(obj,key,val,enumerable){
  Object.defineProperty(obj,key,{
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
};

export function isObject(obj){
  return obj !== null && typeof obj === 'object';
};
