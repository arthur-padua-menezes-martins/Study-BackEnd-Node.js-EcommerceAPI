const multer = require('multer')
const { resolve } = require('path')


module.exports = 
{
    storage : multer.diskStorage({ 
        destination : ( request, file, callback ) => 
        { 
            callback( null, resolve( __dirname, '..', '..', 'uploads' ) ) 
        }, 
        filename : ( request, file, callback ) => 
        { 
            callback( null, new Date().getTime() + '-' + file.originalname ) 
    }})
}

