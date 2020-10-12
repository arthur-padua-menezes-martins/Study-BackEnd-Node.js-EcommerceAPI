import axios from 'axios'
import config from '../config/index.js'
import 
{ 
    GET_USERS, GET_USER, UPDATE_USER, REMOVE_USER, GET_USER_REQUESTS
} from './types.js'

axios.defaults.withCredentials = true;

export default 
{


    getUsers : ( SearchCurrentPage, SearchLimit ) =>
    {
        return async dispatch =>
        {
            await axios.get( `${config.api}/adm/control/users?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}` ).then( response => {

                dispatch( { type : GET_USERS, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    getUser : _id =>
    {
        return async dispatch =>
        {

            await axios.get( `${config.api}/adm/control/users/${_id}?view=true` ).then( response => {

                dispatch( { type : GET_USER, payload : response.data } )

            }).catch( error => console.error( error ))

        }
    },


    getUserRequests : ( _id, SearchCurrentPage, SearchLimit ) =>
    {
        return async dispatch =>
        {

            await axios.post( `${config.api}/adm/control/users/${_id}?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}`, 
            { _id, view : true } ).then( response => {

                dispatch( { type : GET_USER_REQUESTS, payload : response.data } )

            }).catch( error => console.error( error ))

        } 
    },


    updateUser : ( _id, payload ) =>
    { 

        return async dispatch =>
        {

            await axios.post( `${config.api}/adm/control/users/${_id}`, 
            { _id, payload, update : true } ).then( response => {

                dispatch( { type : UPDATE_USER, payload : response.data } )

            }).catch( error => console.error( error ))

        }
    },


    removeUser : ( _id ) =>
    { 
        return async dispatch =>
        {

            await axios.post( `${config.api}/adm/control/users/${_id}`, 
            { remove : true } ).then( response => {

                dispatch( { type : REMOVE_USER, payload : response.data } )

            }).catch( error => console.error( error ))

        }
    }


}
