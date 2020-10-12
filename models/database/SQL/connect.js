

/*BASIC MODULES*/
const server = require('../../../server.js')

/*DATABASE MODULES*/
const mysql = require('mysql')




/*MYSQL*/
/**********************************************************************************************************************************/

var 
    mysqlConnection = mysql.createConnection( 
    {
        host:'localhost', 
        user:'root', 
        password:'', 
        database:'ecommerce_sn' 
    }) 

mysqlConnection.connect( ( error ) => { return  error  ?  console.error( error )  :  '' })




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = [ mysqlConnection ]
