

const multer = require('multer')

const storage = multer.diskStorage({

    destination:(request, file, callback) => 
        callback(null, __dirname + '../public/images'),

    filename: (request, file, callback) => 
        callback(null, file.filename + '-' + Date.now() + '.jpg')

})
const upload = multer({ storage })




/*EXPORTS FILE UPLOADS CONFIGURATION*/
/**********************************************************************************************************************************/
module.exports = upload