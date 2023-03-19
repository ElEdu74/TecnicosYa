const mysql = require('mysql2');

const DB_PORT = 6256 //process.env.PORT || 3000
const DB_HOST = 'containers-us-west-93.railway.app' //process.env.DB_HOST || 'localhost'
const DB_USER = 'root' //process.env.DB_USER || 'root'
const DB_PASSWORD = 'c7VHTfK8YGwCJu7VVUHp' //'V8DNha8jMLZqdPZxLr2H' //process.env.DB_PASSWORD || 'mysCobain74$'
const DB_NAME = 'railway' //process.env.DB_NAME || 'tecnicos_ya'

// const DB_PORT = 3306
// const DB_HOST = 'localhost'
// const DB_USER = 'root'
// const DB_PASSWORD = 'mysCobain74$'
// const DB_NAME = 'tecnicos_ya'

//const db = mysql.createConnection({
//    host: DB_HOST, //'localhost',
//    user: DB_USER, //'root',
//    password: DB_PASSWORD, //'mysCobain74$',
//    database: DB_NAME //'tecnicos_ya'
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'bbab43d5154ee4',
//     password: 'c8fdb4b2',
//     database: 'heroku_c918f436f97afc1'
// });

const db = mysql.createPool({
    host: DB_HOST, //'localhost',
    user: DB_USER, //'root',
    password: DB_PASSWORD, //'mysCobain74$',
    database: DB_NAME, //'tecnicos_ya',
    port: DB_PORT
    //waitForConnections: true,
    //connectionLimit: 10,
    //queueLimit: 0
});

// db.connect(function(err) {
//     if (err) throw err;
//     console.log('DATABASE CONNECTED!');
// });

module.exports = db;