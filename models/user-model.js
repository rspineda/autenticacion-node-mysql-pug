const authModel = require('./movie-schema'); //para la conexión con la base de datos

const Auth = ()=>{

};

Auth.getUser = (user, cb)=>{
    authModel.query(`SELECT * FROM users WHERE username = '${user.username}' AND password = '${user.password}'`, cb);
};

Auth.setUser = (user, cb)=>{
    authModel.query("INSERT INTO users SET ?", user, cb)
};

module.exports = Auth;