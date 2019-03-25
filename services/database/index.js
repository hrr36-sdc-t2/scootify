var 
  maria = require('mariadb');

const dbConnection = maria.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PWD || 'mar1a',
  database: 'hrr',
  connectionLimit: 3
});

module.exports = dbConnection;
