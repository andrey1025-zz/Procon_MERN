const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('config');
const cors = require("cors");
const path = require("path");

// middlewares
const errorHandler = require('./middleware/errorHandler');

// api routes
const auth = require('./routes/authRoutes');
const project = require('./routes/projectRoutes');

// express setups
const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(helmet());
app.use(compression());

//#region CORS
app.use(
    cors({
        origin: "http://localhost:3001",
        allowedHeaders: "Content-Type, Authorization, X-Requested-With",
        methods: "*",
        credentials: true
    })
);
//#endregion CORS

//#region MongoDB Connection
mongoose.connect(config.get("db"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to db");
}).catch(() => {
    console.log("Connection failure to db.");
});
//#endregion MongoDB Connection

//#region API Routes
app.get('/', (req, res) => res.json({ message: 'Welcome to Procon API' }));
app.use('/api/auth', auth);
app.use('/api/project', project);
app.use(errorHandler);
//#endregion API Routes

// var FORGE_CLIENT_ID = "inAurtYxDjVvKvtYEG43viKA5IXAtHGi";
// var FORGE_CLIENT_SECRET = "28pInoNjHXlQT8oT";
// var access_token = '';
// var scopes = 'data:read data:write data:create bucket:create bucket:read';
// const querystring = require('querystring');

// // // Route /api/forge/oauth
// app.get('/api/forge/oauth', function (req, res) {
//     Axios({
//         method: 'POST',
//         url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//         },
//         data: querystring.stringify({
//             client_id: FORGE_CLIENT_ID,
//             client_secret: FORGE_CLIENT_SECRET,
//             grant_type: 'client_credentials',
//             scope: scopes
//         })
//     })
//         .then(function (response) {
//             // Success
//             access_token = response.data.access_token;
//             // res.redirect('/api/forge/datamanagement/bucket/create');
//         })
//         .catch(function (error) {
//             // Failed
//             res.send('Failed to authenticate');
//         });
// });

module.exports = app;