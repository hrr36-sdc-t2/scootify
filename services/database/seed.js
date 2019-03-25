
const
  SQL = require('sql-template-strings')
  , mysql = require('mysql')
  , mdb = require('./index.js')
  , path = require('path')
  , fs = require('fs');

const mydb = mysql.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PWD || '',
  database: 'hrr',
  connectionLimit: 3
});

fs.readFile(path.join(__dirname, 'featured.json'), 'utf8', (err, data) => {

  if (err) {
    console.log(err);
  } 
  else {
    let 
      json = JSON.parse(data).aTracks
      , tracks = [];

      
    for (let track of json) {
      tracks.push([track.track_id, track.track_title, track.artist_name, track.album_title]);
    }
  
    mydb.query(`INSERT INTO tracks (track_id, title, artist, album) VALUES ?`, [tracks], (err, res) => {
      if (err) {
        console.log(err);
      } 
      else {
        console.log(res);
      }
    });

  }

  return; 

});

fs.readFile(path.resolve(__dirname, 'featured.json'), 'utf8', (err, data) => {

  if (err) {
    console.log(err);
    return;
  }

  let 
    results = JSON.parse(data)
    , mockData = [];

  for (let i = 0; i < 9; i++) {
    let mockObj = {
      track_id: results.aTracks[i].track_id,
      track_title: results.aTracks[i].track_title,
      track_duration: results.aTracks[i].track_duration,
      artist_name: results.aTracks[i].artist_name,
      album_title: results.aTracks[i].album_title,
      album_image_file: results.aTracks[i].album_image_file,
      track_url: results.aTracks[i].track_url
    };
    mockData.push(mockObj);
  }

  mdb
    .query(
      'INSERT INTO current_playlist (owner, name, image_url, songs) VALUES ("obdb", "hrr36-fec2-sml", "someimg.jpg", ?)'
      , [JSON.stringify(mockData)]
    )
    .then((qResults) => {
      if (!qResults) {
        throw 'failed to seed';
      }
      console.log('done seeding sml');
      return;
    })
    .catch((err) => {
      console.log(err);
    });

  mockData = [];

  for (let i = 10; i < 27; i++) {
    let mockObj = {
      track_id: results.aTracks[i].track_id,
      track_title: results.aTracks[i].track_title,
      track_duration: results.aTracks[i].track_duration,
      artist_name: results.aTracks[i].artist_name,
      album_title: results.aTracks[i].album_title,
      album_image_file: results.aTracks[i].album_image_file,
      track_url: results.aTracks[i].track_url
    };
    mockData.push(mockObj);
  }

  mdb
    .query(
      'INSERT INTO current_playlist (owner, name, image_url, songs) VALUES ("obdb", "hrr36-fec2-med", "someimg.jpg", ?)'
      , [JSON.stringify(mockData)]
    )
    .then((qResults) => {
      if (!qResults) {
        throw 'failed to seed';
      }
      console.log('done seeding med');
      return;
    })
    .catch((err) => {
      console.log(err);
    });

  mockData = [];

  for (let i = 28; i < 54; i++) {
    let mockObj = {
      track_id: results.aTracks[i].track_id,
      track_title: results.aTracks[i].track_title,
      track_duration: results.aTracks[i].track_duration,
      artist_name: results.aTracks[i].artist_name,
      album_title: results.aTracks[i].album_title,
      album_image_file: results.aTracks[i].album_image_file,
      track_url: results.aTracks[i].track_url
    };
    mockData.push(mockObj);
  }

  mdb
    .query(
      'INSERT INTO current_playlist (owner, name, image_url, songs) VALUES ("obdb", "hrr36-fec2-lrg", "someimg.jpg", ?)'
      , [JSON.stringify(mockData)]
    )
    .then((qResults) => {
      if (!qResults) {
        throw 'failed to seed';
      }
      console.log('done seeding lrg');
      return;
    })
    .catch((err) => {
      console.log(err);
    });

  mockData = [];

  return;
  
});

fs.readFile(path.resolve(__dirname, 'featured.json'), 'utf8', (err, data) => {

  if (err) {
    console.log(err);
    return;
  }

  let 
    recordsInserted = 0
    , tracks = JSON.parse(data).aTracks
    , songs = [
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_01_-_Stickle.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_02_-_Bridgewalker.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_03_-_The_Poplar_Grove.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_04_-_Silver_Lanyard.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_05_-_Our_Only_Lark.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_06_-_Donnalee.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_07_-_Basketliner.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_08_-_Delamine.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_09_-_Lovers_Hollow.mp3',
      'https://storage.cloud.google.com/scootify.appspot.com/Blue_Dot_Sessions_-_10_-_True_Blue_Sky.mp3',
    ];

  for (var i = 0; i < 23; i++) {

    // changing track_duration value from string of hrs:min:sec to seconds
    let
      track = tracks[i] 
      , trackFileUrl = songs[i % songs.length]
      , arr = track.track_duration.split(':')
      , totalSeconds = 0;

    totalSeconds = parseInt(arr[0], 10) * 3600;
    totalSeconds += parseInt(arr[1], 10) * 60;
    totalSeconds += parseInt(arr[2], 10) * 1;

    // changing album_image_file value to a url
    let albumArtUrl = 'https://freemusicarchive.org/file/' + track.album_image_file;
    
    mdb.query(
      'INSERT INTO playlist (track_id, track_title, artist_name, album_title, track_duration, album_image_file, track_file_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
      , [track.track_id, track.track_title, track.artist_name, track.album_title, totalSeconds, albumArtUrl, trackFileUrl]
    )
    .then((qResults) => {
      if (!qResults) {
        throw 'failed to seed';
      }
      return;
    })
    .catch((err) => {
      console.log(err);
    })

    recordsInserted++;
    console.log(recordsInserted + ' records inserted');

  }

  // mdb.end();

  return;

});