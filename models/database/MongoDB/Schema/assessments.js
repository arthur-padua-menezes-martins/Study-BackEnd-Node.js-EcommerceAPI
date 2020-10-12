const

/*DATABASE MODULES*/
    mongoose = require(`mongoose`),
    Schema = mongoose.Schema,



    
assessmentsSchema = new mongoose.Schema
({

    name:
    {
        type : String 
    },

    stars:
    {
        type : String 
    },

    message: 
    { 
        type : String 
    },

    users:
    {
        type: Schema.Types.ObjectId, 
        ref: `users` 
    },

    products:
    {
        type: Schema.Types.ObjectId, 
        ref: `products` 
    },

}, { timestamps : true } )




module.exports = mongoose.model( `assessments`, assessmentsSchema )