const userController = require('../controllers/userController')
const cookie = require('./cookie')
const hasher = require('./hasher')

module.exports = (app) => {

    app.post('/register', (req, res) => {  
	let sessid = cookie()
	let newUser = {
	    username: req.body.username,
	    email: req.body.email,
	    password: hasher(req.body.password),
	    sessid: sessid
        }
 	userController.newUser(newUser)
	.then((response) => {
	    console.log(response, 'response from /register')
            if (response === 'account exists') {
                res.send({emailCheck: 'account exists' })
            } else {
	    res.send({sessid: sessid}) 
	   }
	})
    });

    app.post('/login', (req, res) => {
        let sessid = cookie()
        let user = {
            email: req.body.email,
	    password: hasher(req.body.password),
	    sessid: sessid
        }
 	userController.loginUser(user)
	.then((response) => {
	    console.log(response, 'response from /login')
	    res.send({
	        passCheck: response, 
                sessid: sessid
            })
	})
    });

}