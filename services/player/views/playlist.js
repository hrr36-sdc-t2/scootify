let playlist = [];

const createPlaylist = function (callback) {
  // fetch('http://localhost:3000/playlist')
  fetch('http://35.235.73.61:3000/playlist')
    .then(res => res.json())
    .then(
      (result) => {
        for (var i = 0; i < result.length; i++) {
          playlist.splice(0, 0, result[i]);
        }
        callback();
      },
      (error) => {
        callback(error);
        console.log(error, 'ERROR POPULATING PLAYLIST!');
      }
    );
};

module.exports = {
  createPlaylist,
  playlist
};