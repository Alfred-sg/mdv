"use strict";

import document from 'global/document';

export function isHTMLElement(node){
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
};

export function querySelector(container){
  return document.querySelector(container)
};

