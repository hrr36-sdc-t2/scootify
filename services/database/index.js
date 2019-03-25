var 
  maria = require('mariadb');

const dbConnection = maria.createPool({
  host: 'localhost',
  user:'root',
  password: process.env.DB_PWD || '',
  database: 'hrr',
  connectionLimit: 3
});

module.exports = dbConnection;
