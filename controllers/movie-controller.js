const movieModel = require('../models/movie-model'), 
      errors = require('../middlewares/errors');  



const ControllerMovie = ()=>{
};

ControllerMovie.getAll = (req, res, next)=>{
    movieModel.getAll((err, result, fields)=>{  //result me da las filas de la tabla
        if(err){
            let locals = {
                title: "ERROR 404",
                description: "RECURSO NO ENCONTRADO",
                error: error
            }
            res.render("error", locals);
        }else{
            let locals ={
                title: 'Lista de peliculas',
                data: result
            }
            res.render('index', locals);
        }
    });
};

ControllerMovie.add = (req, res, next)=>{
    res.render('add-form', {title:'Añadir Película a la base de datos'});
};

ControllerMovie.saveAdd = (req, res, next)=>{
    let newMovie = {
        movie_id : req.body.movie_id,
        title : req.body.title,
        release_year : req.body.release_year,
        rating : req.body.rating,
        image: req.body.image 
    };

    movieModel.save(newMovie, (err, result, fields)=>{
        if(err){
            let locals = {
                title: `Error al grabar la nueva película con id: ${newMovie.movie_id}`,
                description: "Error de sintaxis",
                error: err
            }
            res.render("error", locals);
        }else{
            res.redirect("/movies");
        }
    })
};

ControllerMovie.update = (req, res, next)=>{
    let movie_id = req.params.movie_id;
    movieModel.update(movie_id, (err, result, fields)=>{
        if(err){
            let locals = {
                title: `Error al cargar la pelicula con id: ${movie_id} para editarla`,
                description: "Error de sintaxis",
                error: err
            }
            res.render("error", locals);
        }else{
            let locals = {
                title : "Editar pelicula",
                data : result
            }
            res.render("edit", locals);
        }
    })
};

ControllerMovie.saveUpdate = (req, res, next)=>{
    const updatedMovie = {
        movie_id : req.body.movie_id, //este lo saco del input hidden ya que no permito editarlo para poder hacer la comparación en la base de datos.
        title : req.body.title,
        release_year : req.body.release_year,
        rating : req.body.rating,
        image: req.body.image 
    };
    movieModel.saveUpdate(updatedMovie, (err, result, fileds)=>{
        if(err){
            let locals = {
                title: `Error al editar la película con id: ${updatedMovie.movie_id}`,
                description: "Error de sintaxis",
                error: err
            }
            res.render("error", locals);
        }else{
            res.redirect("/movies");
        }
    })
};

ControllerMovie.delete = (req, res, next)=>{
    let movie_id = req.params.movie_id;
    movieModel.delete(movie_id, (err, result, fields)=>{
        if(err){
            let locals ={
                title: `Error al eliminar la película con id: ${movie_id}`,
                description: "Error de sintaxis",
                error: err
            }
        }else{
            res.redirect("/movies");
        }
    })
};


module.exports = ControllerMovie;