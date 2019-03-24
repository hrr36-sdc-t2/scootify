import React from 'react';

const MetaData = props => {
  return (
    <div className="now-playing">
      <img src={props.albumThumbnail} alt='album cover art thumbnail' />
      <div className="meta">
        <span className="title">{props.title}</span>
        <span className="artist-name">{props.artist}</span>
      </div>
      <button className="favorite" onClick={props.onClick}>
        <i className={props.favorite ? 'fas fa-heart' : 'far fa-heart'}></i>
      </button>
    </div>
  );
};

export default MetaData;