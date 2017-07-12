"use strict";

import { ModelDecorator } from "../../../../src/index"; 
import { FriendResource } from "../resource/friend"; 

const friends = [
  {
    id: 1,
    name: 'Bruce Wayne',
    username: '@Batman',
    books: [{
      title:"12"
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

@ModelDecorator()
class Friends{
  query = ""
  friends = friends
  setQuery(q){
    this.query = q;
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
