const authModel = require('./movie-schema'); //para la conexión con la base de datos

const Auth = ()=>{

};

Auth.getUser = (user, cb)=>{
    //le paso un SELECT COUNT(*) para que me cuente las coincidencias y ademas le pongo de nombre, count, para poder manipularlo.
    authModel.query(`SELECT COUNT (*) AS count FROM users WHERE username = '${user.username}' AND password = '${user.password}'`, cb);
};

Auth.setUser = (user, cb)=>{
    authModel.query("INSERT INTO users SET ?", user, cb)
};

module.exports = Auth;