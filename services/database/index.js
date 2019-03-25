var maria = require('mysql');

const dbConnection = maria.createPool({
  host: 'localhost',
  user:'root',
  password: 'mar1a',
  database: 'hrr',
  connectionLimit: 3
});

module.exports = dbConnection;
