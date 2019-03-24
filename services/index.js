import React from 'react';
import ReactDOM from 'react-dom';
import socketIO from 'socket.io-client';

import PlayList from './playlist/views/PlayList.js';
import Recommends from './recommends/views/components/Recommends.jsx';
import Player from './player/views/components/Player.jsx';

const App = () => {
  let socket = socketIO().connect('http://localhost:3000');
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ position: 'fixed', width: '10%', minHeight: '100%', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
        <div style={{ margin: '1rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>Scootify</div>
      </div>
      <div style={{ marginLeft: '10%', width: '90%' }}>
        <PlayList socket={socket} />
        <div style={{ margin: '0 1rem'}}>
          <Recommends socket={socket} />
        </div>
      </div>
      <div>
        <Player socket={socket} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);