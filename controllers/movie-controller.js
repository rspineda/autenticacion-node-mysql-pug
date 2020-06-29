const movieModel = require('../models/movie-model'), 
      errors = require('../middlewares/errors');  



const ControllerMovie = ()=>{
};

ControllerMovie.getAll = (req, res, next)=>{
    //sólo le permito accerder a las pelis si está logueado, osea si hay el objeto   req.session.username
    if(req.session.username){
        return  movieModel.getAll((err, result, fields)=>{  //result me da las filas de la tabla
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
        }else{
            return errors.http401(req,res,next);  //si no está logueado le mando el error401

        }
    
};

ControllerMovie.add = (req, res, next)=>{
    if(req.session.username){
       return  res.render('add-form', {title:'Añadir Película a la base de datos'});
    }else{
        return errors.http401(req,res,next);
    }
    
};

ControllerMovie.saveAdd = (req, res, next)=>{
    let newMovie = {
        movie_id : req.body.movie_id,
        title : req.body.title,
        release_year : req.body.release_year,
        rating : req.body.rating,
        image: req.body.image 
    };

    if(req.session.username){
        return movieModel.save(newMovie, (err, result, fields)=>{
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
    }else{
        return errors.http401(req,res,next);
    }
    
};

ControllerMovie.update = (req, res, next)=>{
    let movie_id = req.params.movie_id;

    if(req.session.username){
        return movieModel.update(movie_id, (err, result, fields)=>{
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
    }else{
        return errors.http401(req,res,next);
    }
    
};

ControllerMovie.saveUpdate = (req, res, next)=>{
    const updatedMovie = {
        movie_id : req.body.movie_id, //este lo saco del input hidden ya que no permito editarlo para poder hacer la comparación en la base de datos.
        title : req.body.title,
        release_year : req.body.release_year,
        rating : req.body.rating,
        image: req.body.image 
    };

    if(req.session.username){
       return movieModel.saveUpdate(updatedMovie, (err, result, fileds)=>{
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
    }else{
        return errors.http401(req,res,next);
    }
    
};

ControllerMovie.delete = (req, res, next)=>{
    let movie_id = req.params.movie_id;

    if(req.session.username){
        return movieModel.delete(movie_id, (err, result, fields)=>{
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
    }else{
        return errors.http401(req,res,next);
    }
    
};


module.exports = ControllerMovie;