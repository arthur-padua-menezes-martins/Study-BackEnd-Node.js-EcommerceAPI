

/*BASIC MODULES*/
var { Sequelize } = require('sequelize')

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const connect = require('./connect')





try
{
    var users = connect[1][0].define( 'users',
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


    var administrators = connect[1][0].define( 'administrators',
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




    var products = connect[1][0].define( 'products',
    {
        reference:          {  type: Sequelize.STRING(8),    allowNull: false,  unique: true  },
        product:            {  type: Sequelize.STRING(30),   allowNull: false  },
        category:           {  type: Sequelize.STRING(30),   allowNull: false  },
        stars:              {  type: Sequelize.STRING(1)    },
        description:             {  type: Sequelize.TEXT  },
        techinical_information:  {  type: Sequelize.TEXT  },
        link:                    {  type: Sequelize.TEXT  },
    }) 

    products.addHook( 'beforeCreate', async products => 
    {
        products.link = `http://localhost:10001/${products.product}/${products.category}/${products.reference}`
    })


    variations = connect[1][0].define( 'variations', 
    {
        name:               {  type: Sequelize.STRING(100)  },
        difference:         {  type: Sequelize.STRING(20)  },
        images:             {  type: Sequelize.STRING(1024) },
        value:              {  type: Sequelize.DOUBLE(5,2)  },
        standard_value:     {  type: Sequelize.DOUBLE(5,2)  },
        number_of_installments:  {  type: Sequelize.INTEGER(2)   },
        installments_value:      {  type: Sequelize.DOUBLE(5,2)  },
        discount_ticket:         {  type: Sequelize.INTEGER      },
        width:                   {  type: Sequelize.DOUBLE(5,2)  },
        height:                  {  type: Sequelize.DOUBLE(5,2)  },
        length:                  {  type: Sequelize.DOUBLE(5,2)  },
        weight:                  {  type: Sequelize.DOUBLE(5,2)  },
        amount:                  {  type: Sequelize.INTEGER(4)   },
        delivery:                {  type: Sequelize.TEXT }
    })

    variations.addHook( 'beforeCreate', async variations =>
    {
        const v = variations
        /*
        const keys = new Array
        (
            v.standard_value, v.value * 1.3
        )

        for( let i = 0; i <= keys.length - 2; i +=2 )
            { keys[i] = autoComplete( keys[i], keys[i+1] ) }
            */
        v.standard_value = autoComplete( v.standard_value, v.value * 1.3 )

        function autoComplete( reference, value )
            { return !reference ?  reference = value  :  reference }
    })
//─

    var comments = connect[1][0].define( 'comments',
    {
        stars:      {  type: Sequelize.STRING(1),  allowNull: false  },
        comment:    {  type: Sequelize.TEXT,       allowNull: false  }
    }) 
    


    variations.belongsTo( products, { foreingKey : 'id' } )
    comments.belongsTo( products, { foreingKey : 'id' } )
    comments.belongsTo( users, { foreingKey : 'id' } )
    products.hasMany( variations )

    //products.hasMany(comments, { foreingKey : 'id' } )
    //users.hasMany(comments, { foreingKey : 'id' } )
    
    //users.sync({ force:true })
    //administrators.sync({ force:true })

    //products.sync({ force:true })
    //variations.sync({ force:true })
    //comments.sync({ force:true })
    
 

}
catch (error) { console.error(`Unable to connect to the database: ${error}`) }
//include : [{ model : comments/products }]
//where: { state: Sequelize.col('project.state') }

// INNER JOIN .. ON task.state === project.task


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = [ users, administrators, products, variations, comments ]