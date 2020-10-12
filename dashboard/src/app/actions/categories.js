import axios from 'axios'
import config from '../config/index.js'
import 
{ 
    CREATE_CATEGORY, GET_CATEGORIES, GET_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY
} from './types.js'

axios.defaults.withCredentials = true;

export default 
{

    getCategories : ( SearchCurrentPage = 0, SearchLimit = 30 ) =>
    { 
        return async dispatch =>
        {
            await axios.get( `${config.api}/adm/control/categories?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}` ).then( response => {

                dispatch( { type : GET_CATEGORIES, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    getCategory : ( _id, SearchCurrentPage = 0, SearchLimit = 30 ) =>
    {
        return async dispatch =>
        {
            await axios.get( `${config.api}/adm/control/categories/${_id}?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}` ).then( response => {

                dispatch( { type : GET_CATEGORY, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    updateCategory : ( _id, payload ) =>
    {
        return async dispatch =>
        {
            await axios.post( `${config.api}/adm/control/categories/${_id}`, 
            { _id, payload, update : true  } ).then( response => {

                dispatch( { type : UPDATE_CATEGORY, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    removeCategory : ( _id ) =>
    {
        return async dispatch =>
        {
            await axios.post( `${config.api}/adm/control/categories/${_id}`, 
            { _id, remove : true  } ).then( response => {

                dispatch( { type : REMOVE_CATEGORY, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    }

}