//este archivo me va a perimitir la conexión con SQL

const mysql = require('mysql'),
      con = mysql.createConnection({
          host: 'localhost',      
          user: 'root',  
          password: '',  
          database: 'movies'  
      }); 

con.connect((err)=>{
    if(err) throw err;
    console.log('connected to: ', con.threadId);
});

module.exports = con;