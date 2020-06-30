const authModel = require('../models/user-model'),
        errors = require('../middlewares/errors');

const ControllerAuth = ()=>{

};

ControllerAuth.index = (req,res,next)=>{
        if(req.session.username){
                res.redirect('/movies')
        }else{
                let locals = {
                       title : 'Autenticación de Usuarios',
                       message : req.query.message  //aquí entra el mensaje de confirmación de cuando se registre un usuario en la ruta signup.
                };
                res.render('login-form', locals);
        }
};

ControllerAuth.logInGet = (req,res,next)=>{
        res.redirect('/')
};

ControllerAuth.logInPost = (req,res,next)=>{
        let user = {
                username : req.body.username,
                password : req.body.password
        };

        authModel.getUser(user, (err, data)=>{
                if(err){
                        let locals = {
                                title : 'Error al consultar la base de datos',
                                description: "Error de sintaxis SQL",
                                error : err
                        };
                        res.render('error', locals);
                }else{
                        req.session.username = (data[0].count == 1)?user.username:null; //le asigno a a la variable username de req.user. el numero de coincidencia que hay en la base dedatos con esos datos de login. Si hay uno, coge el valor del usuario del login, si hay cero significa que no coincide con ningun usuario en la base de datos, y no le dejo acceder.
                        console.log("el objeto session: ",req.session, "y el objeto de mysql:", data);

                        return (req.session.username)?res.redirect('/movies'):errors.http401(req,res,next);
                }
        })
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
                    // console.log("usuario creado correctamente");   
                     res.redirect(`/?message=El usuario ${user.username} ha sido registrado correctamente`); //este mensaje le paso por la query y la recojo en la ruta / con el renderizado.
                        
                }
        });
};

ControllerAuth.logOut = (req,res,next)=>{
        req.session.destroy((err=>{
                return (err)?errors.http500(req,res,next):res.redirect('/'); //si hay un error al destruir la sesion le paso un error en el servidor, si todo va bien lo mando al home paraun nuevo login.
        }))
};


module.exports = ControllerAuth;