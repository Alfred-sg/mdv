"use strict";

import { ModelDecorator, StateModel } from "../../../../src/index"; 
import { FriendResource } from "../resource/friend";

const friends = [
  {
    id: 1,
    name: 'Bruce Wayne',
    username: '@Batman',
    books: [{
      title:"12", brief:"", publishDate:""
    }]
  },
  {
    id: 2,
    name: 'Clark Kent',
    username: '@Superman',
    books: [{
      title:"12"
    }]
  },
  {
    id: 3,
    name: 'Maz ‘Magnus’ Eisenhardt',
    username: '@Magneto',
    books: [{
      title:"12"
    }]
  },
  {
    id: 4,
    name: 'Reed Richards',
    username: '@Mister-Fantastic',
    books: [{
      title:"12"
    }]
  },
  {
    id: 5,
    name: 'Charles Francis Xavier',
    username: '@ProfessorX',
    books: [{
      title:"12"
    }]
  },
  {
    id: 6,
    name: 'Lex Luthor',
    username: '@LexLuthor',
    books: [{
      title:"12"
    }]
  },
  {
    id: 7,
    name: 'Benjamin Grimm',
    username: '@Thing',
    books: [{
      title:"12"
    }]
  },
  {
    id: 8,
    name: 'Walter Langkowski',
    username: '@Sasquatch',
    books: [{
      title:"12"
    }]
  },
  {
    id: 9,
    name: 'Andrew Nolan',
    username: '@Ferro-Lad',
    books: [{
      title:"12"
    }]
  },
  {
    id: 10,
    name: 'Jonathan Osterman',
    username: '@Dr.Manhattan',
    books: [{
      title:"12"
    }]
  }
];

@StateModel.ObjectModel
class Friend{
  addBooks(book){
  }
}


@StateModel.ArrayModel
class FriendsList{
  static ItemModel = Friend
  addFriend(friend){
    this.push(friend);
  }
}

@ModelDecorator()
class Friends{
  static propsModel = {
    friends: FriendsList
  }
  query = ""
  friends = friends
  setQuery(q){
    this.query = q;
    console.log(this.friends[0])
    this.friends = friends.filter(friend => {
      let keep = false;
      Object.keys(friend).forEach(key => {
        const val = friend[key].toString();
        if (val.toLowerCase().includes(q.toLowerCase())) {
          keep = true;
        }
      });
      return keep;
    });
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
  queryFriend(){
    FriendResource.query({
      q: this.query
    },(res)=>{
      this.friends = res;
    })
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
