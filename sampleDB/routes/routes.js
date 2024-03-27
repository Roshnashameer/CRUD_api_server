const express = require('express')

// router object
const router = new express.Router()
const user = require('../controllers/userController')
const { jwtMiddleware } = require('../middlewares/jwtmiddleware')

// User creation
router.post('/user', user.create)
// get all users
router.get('/user', user.getAll)
// get specified user
router.get('/user/:_id', user.getUser)
// edit user
router.put('/user/:_id', user.edit)
// delete prject
router.delete(`/user/:_id`, user.delete)
// login
router.post('/user/login',user.login)
// View Authorized user
router.get(`/users`, jwtMiddleware, user.getAuthUser);


module.exports = router