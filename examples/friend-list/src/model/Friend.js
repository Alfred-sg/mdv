"use strict";

import { ModelDecorator } from "../../../../lib/index"; 
import { FriendResource } from "../resource/friend";

@ModelDecorator()
class Friends{
  query = ""
  friends = []
  setQuery(q){
    this.query = q;
    this.queryFriend();
    console.log("start");
  }
  addFriend(){
    console.log(this)
    this.friends.addFriend({
      id: 101,
      name: 'Jonathan Osterman111',
      username: '@Dr.Manhattan',
      books: [{
        title:"12"
      }]
    });
  }
  async queryFriend(){
    let res = await FriendResource.get({});
    this.friends = res;
    console.log(res)
  }
};

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       dispatch({
  //         type: 'setQuery',
  //         payload: location.query.q,
  //       });
  //     });
  //   },
  // }
  // 
export default Friends
