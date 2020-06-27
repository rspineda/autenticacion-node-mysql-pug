const authModel = require('./movie-schema'); //para la conexión con la base de datos

const Auth = ()=>{

};

Auth.getUser = ()=>{

};

Auth.setUser = (user, cb)=>{
    authModel.query("INSERT INTO users SET ?", user, cb)
};

module.exports = Auth;