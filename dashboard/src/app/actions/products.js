import axios from 'axios'
import config from '../config/index.js'
import 
{ 
    CREATE_PRODUCT, GET_PRODUCTS, GET_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, UPDATE_IMAGES
} from './types.js'

axios.defaults.withCredentials = true;
var File

export default 
{

    createProducts : payload =>
    { 
        return async dispatch =>
        {
            await axios.post( `${config.api}/adm/control/products`, 
            { payload, create : true } ).then( response => {

                dispatch( { type : CREATE_PRODUCT, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },
    
    getProducts : ( SearchCurrentPage = 0, SearchLimit = 30 ) =>
    { 
        return async dispatch =>
        {
            await axios.get( `${config.api}/adm/control/products?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}` ).then( response => {

                dispatch( { type : GET_PRODUCTS, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    getProduct : _id =>
    {
        return async dispatch =>
        {
            await axios.get( `${config.api}/adm/control/products/${_id}?view=true` ).then( response => {

                dispatch( { type : GET_PRODUCT, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    updateProduct : ( _id, payload, variation = false ) =>
    {
        if( !variation )
        {
            return async dispatch =>
            {
                await axios.post( `${config.api}/adm/control/products/${_id}?update=true`, 
                { _id, payload  } ).then( response => {
    
                    dispatch( { type : UPDATE_PRODUCT, payload : response.data } )
    
                }).catch( error => console.error( error ))
            }
        }
        else
        {
            return async dispatch =>
            {
                await axios.post( `${config.api}/adm/control/variations/${_id}?update=true`, 
                { payload } ).then( async response => {
  
                    dispatch( { type : UPDATE_PRODUCT, payload : response.data } )
    
                }).catch( error => console.error( error ))
            }
        }
        
    },


    updateImages : ( _id, files ) =>
    {
        return async dispatch =>
        {
            Object.keys(files).forEach( async index =>
            {
                File = new FormData()
                File.append('file', files[index])
                
                await axios.post( `${config.api}/adm/control/variations/${_id}?update=true`, File ).then( async response => {

                    if(index==files.length-1)
                    {
                        dispatch( { type : UPDATE_IMAGES, payload : response.data } )
                    }

                }).catch( error => console.error( error ))
            })
        }
    },


    removeImages : ( _id, index ) =>
    {
        return async dispatch =>
        {
            await axios.post( `${config.api}/adm/control/variations/${_id}?removeImages=true`, { index } ).then( async response => {

                dispatch( { type : UPDATE_IMAGES, payload : response.data } )
    
            }).catch( error => console.error( error ))
        }
    },


    removeProduct : _id =>
    {
        return async dispatch =>
        {
            await axios.post( `${config.api}/adm/control/products /${_id}`, 
            { _id, remove : true  } ).then( response => {

                dispatch( { type : REMOVE_PRODUCT, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


}