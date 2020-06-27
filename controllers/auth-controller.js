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

ControllerAuth.signUpGet = (req,res,next)=>{
        let locals = {
                title : 'Regristro de Usuarios'
         };
        res.render('signup-form', locals);
};

ControllerAuth.signUpPost = (req,res,next)=>{
        const user ={
                user_id : 0,
                username: req.body.username,
                password: req.body.password
        };
        console.log('El nuevo usuario que se registra: ',user),
        authModel.setUser(user, (err, data)=>{
                if(err){
                     let locals = {
                                title : 'Error al consultar la base de datos',
                                description: "Error de sintaxis SQL",
                                error : err
                      };     
                      res.render('error', locals);       
                }else{
                     console.log("usuario creado correctamente");   
                     res.redirect('/');
                        
                }
        });
};

ControllerAuth.logOut = (req,res,next)=>{

};


module.exports = ControllerAuth;