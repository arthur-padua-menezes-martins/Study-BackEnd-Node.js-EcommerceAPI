const 
    transporter = require(`nodemailer`).createTransport( require(`../../config/email/email.js`) ),
    fs = require(`fs`),
    path = require(`path`)

module.exports = async ( User, recovery, callback ) =>
{

    await fs.readFile( await path.resolve( `controllers`, `sendingEmail`, `000_recovery_1.txt` ), async ( error, header ) => {  
    await fs.readFile( await path.resolve( `controllers`, `sendingEmail`, `000_recovery_2.txt` ), async ( error, footer ) => 
    {  

        let mail = await { from : `arthur.software.developer@gmail.com`, to : User.email, subject : `Sertão Nerd | Redefinição de Senha`, html : header + `${recovery}` + footer } 

        await transporter.sendMail( mail, ( error, info ) =>
        {
            if( !error )
            {
                return callback( null, true )
            }
            else
            {
                return callback( true, null )
                
            }
        })

    })})

}

