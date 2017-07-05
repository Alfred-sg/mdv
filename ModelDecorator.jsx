
import ReduxModel from "./ReduxModel";

let models = {};

const ModelDecorator = (name) => {
  return (ModelClass) => {
  	let model;

  	if ( models[name] ) return;

    if ( typeof ModelClass === "function" ){
  	  model = new ModelClass();
    } else {
  	  return;
    };

    models[name] = new ReduxModel(name,model);

    const {reducer,connect,bindActionCreators} = models[name];

    return {
      reducer,
      connect,
      bindActionCreators,
      model
    };
  };

};

export default ModelDecorator