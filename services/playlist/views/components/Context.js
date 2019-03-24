import React, { useState, useEffect } from 'react';
import axios from 'axios';

let useSongs = function() {
  const 
    [ songs, setSongs ] = useState([]),
    [ playListInfo, setPlaylistInfo ] = useState({
      playlist_owner: '',
      playlist_name: '',
      playlist_id: ''
    });
  let loadSongs = async () => {
    try {
      const results = await axios('/api/playlist/1');
      setSongs(JSON.parse(results.data.songs));
      setPlaylistInfo({
        playlist_owner: results.data.owner,
        playlist_name: results.data.name,
        playlist_id: results.data._id
      });
    }
    catch (err) {
      
    }
  }
  useEffect(() => {
    loadSongs()
  }, []);
  return [songs, playListInfo, setSongs];
};

export const usePlaylistState = function() {
  const [ state, setState ] = useState(false);
  const [ active, setActive ] = useState({
    activeTrack: '',
    activeTrackDuration: ''
  });
  let methods = {
    changeActiveTrack (track_id, track_duration) {
      setActive({
        activeTrack: track_id,
        activeTrackDuration: track_duration
      });
    },
    handlePlayClick (track_id, track_duration) {
      setState(!state);
      methods.changeActiveTrack(track_id, track_duration);
    }
  };
  return [ state, setState, active, methods ];
};

export const PlayListContext = React.createContext();

export default ({ children, initialState = {} }) => {
  const 
    [ songs, playListInfo ] = useSongs(),
    [ state, active, methods ] = usePlaylistState();
  let ctx = {
    isPlaying: state,
    activeTrack: active.activeTrack,
    activeTrackDuration: active.activeTrackDuration,
    changeActiveTrack: methods.changeActiveTrack,
    handlePlayClick: methods.handlePlayClick,
    playlist_owner: playListInfo.playlist_owner,
    playlist_name: playListInfo.playlist_name,
    playlist_id: playListInfo.playlist_id,
    song_count: songs.length,
    song_tracks: songs
  };
  return (
    <PlayListContext.Provider value={ctx}>
      { children }
    </PlayListContext.Provider>
  );
};


// {"track_id": "89433", "track_title": "nostalgia of an ex-gangsta-rapper", "track_duration": "00:05:30", "artist_name": "deef", "album_title": "Beat Scene Routine", "album_image_file": "images/albums/deef_-_Beat_Scene_Routine_-_20130821140335983.jpg", "track_url": "https://freemusicarchive.org/music/no_curator/deef/Beat_Scene_Routine/deef_-_04_-_nostalgia_of_an_ex-gangsta-rapper.mp3"}

// let fetchSongs = function() {
//   return axios
//     .get('/api/playlist/1')
//     .then((results) => {
//       if (!results) {
//         throw 'results - failed to get data';
//       }
//       return results.data;
//     })
//     .catch((err) => {
//       console.log('catch - failed to get data');
//     });
// };