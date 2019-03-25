const
  url = require('url')
  , mysql = require('mysql');

const mdb = mysql.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PWD || 'mar1a',
  database: 'hrr',
  connectionLimit: 3
});

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