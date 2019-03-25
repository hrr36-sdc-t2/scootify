const
  models = require('./models')
  , router = require('express').Router();

// get playlist
router.get('/', function(req, res) {
  // console.log(req.body, 'GET PLAYLIST REQUEST RECEIVED BY SERVER!');
  models.getPlaylist30((error, results) => {
    if (error) {
      console.log(error, 'SERVER ERROR FETCHING PLAYLIST!');
      res.status(500).send(error);
    } else {
      // console.log(results, 'SERVER SUCCESS FETCHING PLAYLIST!!');
      res.status(200).json(results);
    }
  });
});

// get a specific track
router.get('/track/:trackid', function(req, res) {
  // console.log(req.body, 'GET TRACK REQUEST RECEIVED BY SERVER!');
  let trackid = req.params.trackid;
  console.log(trackid);
  models.getTrack(trackid, (error, results) => {
    if (error) {
      console.log(error, 'SERVER ERROR FETCHING TRACK!');
      res.status(500).send(error);
    } else {
      // console.log(results, 'SERVER SUCCESS FETCHING TRACK!!');
      res.status(200).json(results);
    }
  });
});

// toggle favorites status on a specific track
router.patch('/track/:trackid', function(req, res) {
  // console.log('PATCH REQUEST RECEIVED BY SERVER!');
  // find track by trackId
  let trackid = req.params.trackid;
  // console.log(trackid);
  models.toggleFavorite(trackid, (error, result) => {
    if (error) {
      console.log(error, 'ERROR IN SERVER, PATCH REQUEST!!');
      res.status(500).send(error);
    } else {
      // console.log(result, 'SUCCESS IN SERVER, PATCH REQUEST!!!');
      res.status(200).json(result);
    }
  });
});

module.exports = router