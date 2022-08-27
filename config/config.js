const mysql = require('mysql2');

// const db = mysql.createConnection({
//     // host: 'localhost',
//     // user: 'root',
//     // password: 'mysCobain74$',
//     // database: 'tecnicos_ya'
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'bbab43d5154ee4',
//     password: 'c8fdb4b2',
//     database: 'heroku_c918f436f97afc1'
// });

const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bbab43d5154ee4',
    password: 'c8fdb4b2',
    database: 'heroku_c918f436f97afc1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// db.connect(function(err) {
//     if (err) throw err;
//     console.log('DATABASE CONNECTED!');
// });

module.exports = db;