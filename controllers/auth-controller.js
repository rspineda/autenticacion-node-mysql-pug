const authModel = require('../models/user-model'),
        errors = require('../middlewares/errors');

const ControllerAuth = ()=>{

};

ControllerAuth.index = (req,res,next)=>{
        if(req.session.username){
                res.redirect('/movies')
        }else{
                let locals = {
                       title : 'Autenticación de Usuarios'
                };
                res.render('login-form', locals);
        }
};

ControllerAuth.logInGet = (req,res,next)=>{
        res.redirect('/')
};

ControllerAuth.logInPost = (req,res,next)=>{

};

ControllerAuth.singUpGet = (req,res,next)=>{

};

ControllerAuth.signUpPost = (req,res,next)=>{

};

ControllerAuth.logOut = (req,res,next)=>{

};


module.exports = ControllerAuth;