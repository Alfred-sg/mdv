"use strict";

import { registerModel, publishModel, getModelsName } from "../model";

export default function (store){
  
  /**
   * 注册数据模型，并将其与stroe绑定
   * @param  {function|Class|array|string|object|null} mod 导入已注册的数据模型或未注册的数据模型
   * @return {object}                                  app
   */
  function model(mod){
    let fnResult;
    if ( typeof mod === "function" ){
      try {
        fnResult = mod();
      } catch(e) {
        registerModel(mod.name,mod);
        publishModel(mod.name,store);
      }finally{
        if ( fnResult ) model(fnResult);
      };
      return this;
    } else if ( Array.isArray(mod) ){
      mod.map(m => {
        model(m);
      });
      return this;
    } else if ( typeof mod === "string" ){
      publishModel(mod,store);
      return this;
    } else if ( typeof mod === "object" ){
      let isModelClass = !Object.keys(mod).some(name => typeof mod[name] !== "function" );
      if ( isModelClass ){
        registerModel(mod.name,mod);
        publishModel(mod.name,store);
        return this;
      }else{
        Object.keys(mod).map(name=>{
          registerModel(name,mod[name]);
          publishModel(name,store);
        });
        return this;
      };
    } else if ( !mod ){
      model(getModelsName());
      return this;
    };
  };

  return model;

};
