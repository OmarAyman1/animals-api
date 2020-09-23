const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const allRoute = require('./api/routes/all');
const alphaRoute = require('./api/routes/alpha');
const classRoute = require('./api/routes/class');
const dietRoute = require('./api/routes/diet');
const familyRoute = require('./api/routes/family');
const genusRoute = require('./api/routes/genus');
const locationRoute = require('./api/routes/location');
const nameRoute = require('./api/routes/name');
const orderRoute = require('./api/routes/order');
const phylumRoute = require('./api/routes/phylum');
const speciesRoute = require('./api/routes/species');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control_Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/', function(request, response){
    response.sendFile(__dirname + '/Home.html');
});

//routes to handle requests
app.use('/all', allRoute);
app.use('/alpha', alphaRoute);
app.use('/class', classRoute);
app.use('/diet', dietRoute);
app.use('/family', familyRoute);
app.use('/genus', genusRoute);
app.use('/location', locationRoute);
app.use('/name', nameRoute);
app.use('/order', orderRoute);
app.use('/phylum', phylumRoute);
app.use('/species', speciesRoute);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;

//manage capital characters locations
//keys are case sensitive
//values edited in code the same as location.js