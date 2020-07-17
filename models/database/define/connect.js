

/*BASIC MODULES*/
const server = require('../../../server.js')

/*DATABASE MODULES*/
const Sequelize = require('sequelize')
const mysql = require('mysql')




/*MYSQL*/
/**********************************************************************************************************************************/

    var mysqlConnection = mysql.createConnection( 
        {
            host:'localhost', 
            user:'root', 
            password:'', 
            database:'ecommerce_sn' 
        }) 

mysqlConnection.connect( ( error ) => { return  error  ?  console.error( error )  :  '' })




/*SEQUELIZE*/
/**********************************************************************************************************************************/
var sequelizeConnection  = new Array 
(
    new Sequelize('ecommerce_sn','root','',{ timezone: "-03:00", host:'localhost', dialect:'mysql' }),
)




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = [ mysqlConnection, sequelizeConnection ]
