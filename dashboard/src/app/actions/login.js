import axios from 'axios'
import config from '../config/index.js'

axios.defaults.withCredentials = true;
var credentials


export default
{
    handleLogin : ( { email, password }, callback ) => 
    {
        credentials = new FormData()
        credentials.append('email', email)
        credentials.append('password',password)
        return (() =>
        {
            axios.post( `${config.api}/login`, 
            { email, password, credentials : Array.from(credentials) }, 
            { headers: { 'Access-Control-Allow-Origin': ['http://localhost:9999', 'http://localhost:10000'] } }
            ).then(response=>{}).catch(error=>console.error(error))
        })() 
    }
}