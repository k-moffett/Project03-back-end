const userController = require('../controllers/userController')
const cookie = require('./cookie')
const hasher = require('./hasher')

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.sendFile(path.join( __dirname, 'build'));
	  });

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
				res.cookie('sessid' , sessid).send('Cookie is set');
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
		res.cookie('sessid' , sessid).send({passCheck: response});
		})
	});
	
	app.post('/getUser', (req, res) => {
		userController.getUser(req.body.sessid)
		.then((response) => {
			res.send(response)
		})
	});
	
	app.post('/user_auth', (req, res) => {
		userController.getUser(req.body.sessid)
		.then((response) => {
			console.log(results, 'user_auth results')
			res.send(response)
		})
    });

}
