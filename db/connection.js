const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
 
connection.connect();

//TEST 
connection.query('SELECT * FROM Test', function (error, results, fields) {
  if (error) throw error;
  results.map((item, index) => {console.log(item.name)});
});
 
connection.end();
