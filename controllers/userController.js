const userModel = require('../models/userModel')

const userController = {
   
    newUser(newUser){
        return userModel.registerCheck(newUser)
    },

    loginUser(user) {
        return userModel.passwordCheck(user)
    },

    getUser(sessid) {
        return userModel.getUser(sessid)
    }

}

module.exports = userController;
