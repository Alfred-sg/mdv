"use strict";

import { isValidElement } from "react";

export default function(history){

  function router(RouterElement){
    if ( isValidElement(RouterElement) ){
	  this._router = () => RouterElement;
    } else {
	  this._router = RouterElement(history);
    };
    return this;
  };

  return router;

};
