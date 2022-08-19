const Sequelize = require('sequelize');

const connection = new Sequelize('kevin','kevin','kevin',{
    host: '102A',
    //port: 3306,
    dialect: 'mysql',
              timezone: '-03:00', // -->Add this line. for writing to database
             
});

module.exports = connection;




//192.168.26.147:8181
//porta 3306