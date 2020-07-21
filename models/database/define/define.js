

/*BASIC MODULES*/
var { Sequelize } = require('sequelize')

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const connect = require('./connect')





try
{
    var users = connect[1][0].define('users',
    {
        name:          {  type: Sequelize.STRING(60),    allowNull: false  },
        email:         {  type: Sequelize.STRING(45),    allowNull: false,  unique: true  },
        password:      {  type: Sequelize.STRING(1024),  allowNull: false  },
        salt:          {  type: Sequelize.STRING(1024)  },
        recovery:      {  type: Sequelize.STRING(14)    }
    }) 
    
    users.addHook('beforeCreate', async (user) => 
    {
        user.salt = crypto.randomBytes(16).toString('hex')
        user.password = crypto.pbkdf2Sync( user.password, user.salt, 8, 256, 'sha512' ).toString('hex')
    })


    var administrators = connect[1][0].define('administrators',
    {
        name:          {  type: Sequelize.STRING(60),    allowNull: false  },
        email:         {  type: Sequelize.STRING(45),    allowNull: false,  unique: true  },
        password:      {  type: Sequelize.STRING(1024),  allowNull: false  },
        salt:          {  type: Sequelize.STRING(1024)  },
        avatar:        {  type: Sequelize.STRING(512)   },
        hierarchy:     {  type: Sequelize.STRING(13),    allowNull: false,  defaultValue: 'administrator' }
    }) 
    
    administrators.addHook('beforeCreate', async (user) => 
    {
        user.salt = crypto.randomBytes(16).toString('hex')
        user.password = crypto.pbkdf2Sync( user.password, user.salt, 8, 256, 'sha512' ).toString('hex')
    })





    var products = connect[1][0].define('products',
    {
        reference:          {  type: Sequelize.STRING(8),    allowNull: false,  unique: true  },
        product:            {  type: Sequelize.STRING(30),   allowNull: false  },
        category:           {  type: Sequelize.STRING(30),   allowNull: false  },
        name:               {  type: Sequelize.STRING(100)  },
        stars:              {  type: Sequelize.STRING(1)    },
        images:             {  type: Sequelize.STRING(1024) },
        value:              {  type: Sequelize.DOUBLE(5,2)  },
        promotional_value:  {  type: Sequelize.DOUBLE(5,2)  },
        standard_value:     {  type: Sequelize.DOUBLE(5,2)  },
        number_of_installments:  {  type: Sequelize.INTEGER(2)   },
        installments_value:      {  type: Sequelize.DOUBLE(5,2)  },
        description:             {  type: Sequelize.TEXT  },
        techinical_information:  {  type: Sequelize.TEXT  },
        link:                    {  type: Sequelize.TEXT  },
        ammout:                  {  type: Sequelize.INTEGER(4)  },
        width:                   {  type: Sequelize.DOUBLE(5,2)  },
        heigth:                  {  type: Sequelize.DOUBLE(5,2)  },
        length:                  {  type: Sequelize.DOUBLE(5,2)  },
        weigth:                  {  type: Sequelize.DOUBLE(5,2)  }
    }) 

    products.addHook('beforeCreate', async (products) => 
    {
        products.link = `http://localhost:10001/${products.product}/${products.category}/${products.reference}`
    })

/*
    var shopping = connect[1][0].define('shopping',
    {
        users_id:               {  type: Sequelize.INTEGER,     allowNull: false  },
        products_id:            {  type: Sequelize.INTEGER,     allowNull: false  },
        delivery:               {  type: Sequelize.STRING(50),  allowNull: false  },
        purchase_date:          {  type: Sequelize.DATETIME  },
        maximum_shipping_date:  {  type: Sequelize.DATETIME  },
    }) 
*/

    var comments = connect[1][0].define('comments',
    {
        stars:      {  type: Sequelize.STRING(1),  allowNull: false  },
        comment:    {  type: Sequelize.TEXT,       allowNull: false  }
    }) 


    var productsHasManyComments = connect[1][0].define(`productsHasManyComments`, 
    {
        userId:  {  type: Sequelize.INTEGER,  allowNull: false  }
    })

    
    

    //comments.belongsTo(products)
    //comments.belongsTo(users)
    //products.hasMany(comments)
    //users.hasMany(comments)
    
    //products.sync({ force:true })
    //users.sync({ force:true })
    //comments.sync({ force:true })
    //administrators.sync({ force:true })
    //shopping.sync({ force:true })
 

}
catch (error) { console.error(`Unable to connect to the database: ${error}`) }
//include : [{ model : comments/products }]
//where: { state: Sequelize.col('project.state') }

// INNER JOIN .. ON task.state === project.task


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = [ users, administrators, products, comments ]

