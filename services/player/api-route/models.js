const 
  mysql = require('mysql');

const mdb = mysql.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PWD || 'mar1a',
  database: 'hrr',
  connectionLimit: 3
});

// selects the first 30 tracks from db
let getPlaylist30 = function(callback) {
  mdb.query(
    'SELECT * FROM playlist ORDER BY id ASC LIMIT 30',
    (err, data) => {
      if (err) {
        console.log(err, 'ERROR WITH MYSQL SELECT QUERY!');
        callback(err, null);
      } else {
        console.log(data, 'this is the playlist data!');
        callback(null, data);
      }
    }
  );
};

// selects a specific track from db based on track_id
let getTrack = function(trackid, callback) {
  mdb.query(
    'SELECT * FROM playlist WHERE track_id = ? LIMIT 1 ',
    [trackid],
    (err, data) => {
      console.log(data)
      if (err) {
        console.log(err, 'ERROR WITH MYSQL SELECT QUERY!');
        callback(err, null);
      } else {
        console.log(data, 'this is the playlist data!');
        callback(null, data);
      }
    }
  );
};

// a function which toggles a song as favorited or unfavorited
let toggleFavorite = function(trackid, callback) {
  mdb.query(
    'UPDATE playlist SET favorite = (favorite + 1) % 2 WHERE track_id = ?',
    [trackid],
    (err, data) => {
      if (err) {
        console.log(err, 'ERROR WITH MYSQL UPDATE QUERY!!');
        callback(err, null);
      } else {
        console.log(data, 'toggled favorites!');
        callback(null, data);
      }
    }
  );
};

module.exports = {
  getTrack,
  getPlaylist30,
  toggleFavorite
};