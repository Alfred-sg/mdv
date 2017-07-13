import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string
};

const FriendThumbnail = ({ name, username, friend }) => (
  <div className="friend-thumbnail">
    <h4 style={{display:"inline-block",marginRight:10}}>
      {name} 
      <span className="username">{username}</span>
    </h4>
    <button>edit</button>
  </div>
);

FriendThumbnail.propTypes = propTypes;
export default FriendThumbnail;
