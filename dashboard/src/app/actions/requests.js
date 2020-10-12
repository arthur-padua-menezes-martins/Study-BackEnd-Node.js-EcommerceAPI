import axios from 'axios'
import config from '../config/index.js'
import 
{ 
    GET_REQUESTS, GET_REQUEST, REMOVE_REQUEST, CLEAR_REQUEST, POST_REQUEST_PAYMENTS_STATUS
} from './types.js'

axios.defaults.withCredentials = true;

export default
{
    
    
    getRequests : ( SearchCurrentPage = 0, SearchLimit = 30 ) =>
    {
        return async ( dispatch ) =>
        {
            await axios.get( `${config.api}/adm/control/requests?view=true&offset=${SearchCurrentPage*SearchLimit}&limit=${SearchLimit}` ).then( response => {

                dispatch( { type : GET_REQUESTS, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },
    
    
    getRequest : _id =>
    {
        return async ( dispatch ) =>
        {
            await axios.get( `${config.api}/adm/control/requests/${_id}/?view=true` ).then( response => {

                dispatch( { type : GET_REQUEST, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },
    
    
    removeRequest : ( _id ) =>
    {
        return async ( dispatch ) =>
        {
            await axios.get( `${config.api}/adm/control/requests/?remove=true&_id=${_id}` ).then( response => {

                dispatch( { type : REMOVE_REQUEST, payload : response.data } )

            }).catch( error => console.error( error ))
        }
    },


    clearRequest : () => ( { type : CLEAR_REQUEST } ),
    
    
    postPaymentsStatus : ( _id, status, method ) => 
    {
        var payload 
        if(method === 'update')
            payload = { update : true }
        else if(method === 'remove')
            payload = { remove : true }

        return async ( dispatch ) =>
        {

            await axios.post( `${config.api}/adm/control/payments/${_id}`, { ...payload, status } ).then( response => {
                    
                dispatch( { type : POST_REQUEST_PAYMENTS_STATUS, payload : response.data } )

            }).catch( error => console.error( error ))

        }
    },


    postDeliveriesStatus : ( _id, status, method ) => 
    { 
        var payload = {}
        if( method === 'trackingCode' )
            payload = { trackingCode : true } 
        else if( method === 'update' )
            payload = { update : true }
        else if( method === 'remove' )
            payload = { remove : true }

        return async ( dispatch ) =>
        {

            await axios.post( `${config.api}/adm/control/deliveries/${_id}`, { ...payload, status } ).then( response => {
                    
                dispatch( { type : POST_REQUEST_PAYMENTS_STATUS, payload : response.data } )

            }).catch( error => console.error( error ))

        } 
    }


}