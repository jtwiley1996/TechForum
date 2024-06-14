const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // Connect to Heroku MySQL database
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Connect to local MySQL database
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            port: process.env.DB_PORT || 3306
        }
    );
}

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        console.log(`${process.env.DB_NAME} database connected`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
