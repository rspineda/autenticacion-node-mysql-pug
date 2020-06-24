const express = require('express'),
      bodyParser = require('body-parser'),  
      session = require('express-session'), //para la autenticación
      morgan = require('morgan'),
      helmet = require('helmet'),
      routes = require('./routes/movie-routes'),
      errors = require('./middlewares/errors'), //pra manejar todos los errores, 404,401 como middlewares.
      methodOverride = require('method-override'), 
      app = express();

app.set('view engine', 'pug');      
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride(function (req, res) { 
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));
app.use(morgan('dev'))
app.use(express.static('public'));
app.use(routes);  



module.exports = app