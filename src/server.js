const express = require('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');

//initialization
const app = express();

//settings
app.set('port', process.env.PORT || 4501);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  PartialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//midlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/cards.routes'));

//global variables


//static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads'));


module.exports = app