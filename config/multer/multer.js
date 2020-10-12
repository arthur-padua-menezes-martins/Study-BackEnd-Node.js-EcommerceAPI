const 
    
multer = require('multer'),

storage = multer.diskStorage({
    destination:(request, file, callback) => 
        callback(null, __dirname + '../public/images'),

    filename: (request, file, callback) => 
        callback(null, file.filename + '-' + Date.now() + '.jpg')
}),

upload = multer( { storage } )

module.exports = upload