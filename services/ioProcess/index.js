const
  axios = require('axios');

module.exports = function(socket) {

  socket.on('addToPlaylist', (payload) => {
    axios
      // .get('http://localhost:3000/api/random')
      .get('http://35.235.73.61:3000/api/random')
      .then((results) => {
        if (!results) {
          throw 'failed to get random playlist data';
        }
        socket.emit('newTrackAdded', results.data)
      })
      .catch((err) => {
        console.log('catched failed to add to playlist')
      })
  });

  socket.on('doPlayTrack', (payload) => {
    socket.emit('playAudio', payload);
  });

  socket.on('playerStarted', (payload) => {
    socket.emit('playerStart', payload);
  });

  socket.on('doResetOther', (payload) => {
    socket.emit('resetOther', payload);
  });

  socket.on('getPlaylistData', (payload, cb) => {
    axios
      // .get(`http://localhost:3000/api/playlist/${payload}`)
      .get(`http://35.235.73.61:3000/api/playlist/${payload}`)
      .then((results) => {
        if (!results) {
          throw 'failed to get playlist data';
        }
        cb(results.data);
      })
      .catch((err) => {
        console.log('failed to get playlist data');
      });
  });

  socket.on('getRecommendsData', (cb) => {
    axios
      // .get('http://localhost:3000/recommends/10')
      .get('http://35.235.73.61:3000/recommends/10')
      .then((results) => {
        if (!results) {
          throw 'failed to get recommends data';
        }
        cb(results.data);
      })
      .catch((err) => {
        console.log('failed to get recommends data')
      });
  });

}