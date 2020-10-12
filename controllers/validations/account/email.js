/*HELPERS MODULES*/ 
const userMessages = require(`../../../helpers/message/userMessages.js`)


module.exports = 
{
    email : ( email ) => 
    {
        return email.match( /\S+@\S+\.\S+/ )  ?  true  :  userMessages.EmailValidator
    }
}