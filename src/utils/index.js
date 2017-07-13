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
