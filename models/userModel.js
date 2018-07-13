const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'project03.crw7awixshbk.us-east-1.rds.amazonaws.com',
  user: 'scraw',
  password: 'H6f3eo7g90',
  database: 'project03_db'
});

connection.connect();

const userModel = {

    registerCheck(user) {
	return new Promise((resolve, reject) => {
        connection.query(`SELECT email FROM users WHERE email=${connection.escape(user.email)};`, function (error, results, fields){
            if (error) {reject(error)}
	    if (results[0] === undefined ) {
	        resolve(userModel.createUser(user))
            } else {
	        resolve('account exists')
            }
        })})
    },   

    createUser(newUser) {
	return new Promise((resolve, reject) => {
        console.log(newUser, 'userModel')
        connection.query(`INSERT INTO users (username, email, password, sessid) VALUES (${connection.escape(newUser.username)}, ${connection.escape(newUser.email)}, ${connection.escape(newUser.password)}, ${connection.escape(newUser.sessid)});`, function (error, results, fields) {
            if (error) {reject(error)}
	    else {
	    resolve('USER SAVED') 
	    }
          });
	})
    },

    passwordCheck(user) {
	return new Promise((resolve, reject) => {
          connection.query(`SELECT password FROM users WHERE email=${connection.escape(user.email)};`, function (error, results, fields){
            if (error) {reject(error)}
            if (user.password === results[0].password) {
	        resolve(userModel.loginUser(user))
            } else {
		resolve('incorrect')
            }
          })
        })
    }, 

    loginUser(user) {
        return new Promise((resolve, reject) => {
          connection.query(`UPDATE users SET sessid=${connection.escape(user.sessid)} WHERE email=${connection.escape(user.email)};`, function (error, results, fields){
            if (error) {
              reject(error)
            } else {
              resolve('correct')
            }
          })
        })
    },

    getUser(sessid) {
        return new Promise((resolve, reject) => {
              connection.query(`SELECT * FROM users WHERE sessid=${connection.escape(sessid)};`, function (error, results, fields){
                if (error) {reject(error)}
                console.log(results, 'USERMODEL')
                resolve(results)
              })
            })
        }
}

module.exports = userModel;


