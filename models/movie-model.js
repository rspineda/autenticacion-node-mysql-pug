const movieModel = require('./movie-schema');

const Movie = ()=>{

};

Movie.getAll = (cb)=>{
    movieModel.query("SELECT * FROM movie", cb) //el callback es el parametro que llega del controlador (movie-controler)
};



Movie.save = (movie, cb)=>{ //movie es el newMovie que me llega del controlador, y el cb es la fucnión que ejecuto en el controlador
    movieModel.query("INSERT INTO movie SET ?", movie, cb); //aquí mando a ejecutar el callback que tengo en el controlador 
};

Movie.update = (movie_id, cb)=>{
    movieModel.query(`SELECT * FROM movie WHERE movie_id = '${movie_id}'`, cb);
};

Movie.saveUpdate = (updatedMovie, cb)=>{
    movieModel.query(`UPDATE  movie SET ? WHERE movie_id = ?`, [updatedMovie, updatedMovie.movie_id], cb);
};

Movie.delete = (movie_id, cb)=>{
    movieModel.query(`DELETE FROM movie WHERE movie_id = '${movie_id}'`, cb )
};

module.exports = Movie;
