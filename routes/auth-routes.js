const ControllerMovie = require('../controllers/movie-controller');

const controller = require('../controllers/auth-controller'),
    express = require('express'),
    router = express.Router();

router
    .get('/', controller.index)
    .get('/login', controller.logInGet)/*
    .post('/login', controller.logInPost)
    .get('/singup', controller.singUpGet)
    .post('/singup', controller.singUpPost)
    .get('logout', controller.logOut);
    */
    
module.exports = router;