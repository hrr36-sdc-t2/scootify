const
  url = require('url')
  , mdb = require('../../database/index.js');

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const limit = Number(url.parse(req.url).pathname.split('/')[1]);
    mdb.query('SELECT * FROM tracks ORDER BY RAND() LIMIT ?', [limit], (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else { 
        res.status(200).send(data);
      }
    });
  }
}