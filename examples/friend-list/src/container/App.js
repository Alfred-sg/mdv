"use strict";

import styles from './App.less';
import React, {Component} from "react";
import { ModelComponent } from "../../../../lib/index"; 
import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

@ModelComponent("Friends",true)
class App extends Component {
  render(){
    const {model} = this.props;
    return (
	    <div className={styles.app}>
        <SearchInput
          value={model.query}
          placeholder="Search friends..." model={model}
          handleSearch={model.setQuery.bind(model)}
        />
        <FriendList friends={model.friends} />
      </div>
    )
  }
};

export default App
