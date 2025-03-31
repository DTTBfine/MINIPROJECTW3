const mysql = require('mysql2');

const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

database.connect(function (err) {
    if (err) console.log('Connection Failed!')
    else console.log("Connected!");
});


module.exports = database