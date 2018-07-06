const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'project03.crw7awixshbk.us-east-1.rds.amazonaws.com',
  user     : 'scraw',
  password : 'H6f3eo7g90',
  database : 'project03_db'
});
 
connection.connect();

//TEST 
connection.query('SELECT * FROM Test', function (error, results, fields) {
  if (error) throw error;
  results.map((item, index) => {console.log(item.name)});
});
 
connection.end();
