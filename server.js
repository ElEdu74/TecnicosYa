const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

/*
* importar rutas
*/
const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors());
const session = require('express-session');
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port', port);


const upload =multer({
    storage: multer.memoryStorage()
})
/*
* llamar rutas
*/
usersRoutes(app, upload);
categoriesRoutes(app);
addressRoutes(app);
productsRoutes(app, upload);
ordersRoutes(app);

//server.listen(3000,'192.168.1.103' || 'localhost', function() {
server.listen(port, function() {
    console.log('Aplicacion de NodeJS ' + port + ' iniciada...')
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

 // ERRROR HANDLER
 app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
 });
