const Sequelize = require("sequelize");
const connection = require("./database");

const Clientes = connection.define('cliente',{
   nome:{
    type: Sequelize.STRING,
    allowNull: false
   },
   cpf:{
    type: Sequelize.STRING,
    allowNull:false,
    primaryKey: true
   },
   endereco:{
    type: Sequelize.STRING,
    allowNull: false
   },   
});
Clientes.sync({force:false}).then(()=>{});
module.exports = Clientes;