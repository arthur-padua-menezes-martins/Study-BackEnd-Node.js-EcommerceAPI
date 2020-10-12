/*basic modules************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
import axios from 'axios'
import config from '../../config.js'
axios.defaults.withCredentials = true;

/*types************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
import {
    GET_REQUESTS,
    GET_REQUEST,
    CLEAN_REQUEST,
    CANCEL_REQUEST
} from '../types.js'

/*return************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
export const

    accountGetRequests = () => dispatch => {
        axios.get(`${config.api}/account/requests/view`).then(response => {

            dispatch({ type: GET_REQUESTS, payload: response.data })

        }).catch(error => console.error(error))
    },

    accountGetRequest = ({ request_id }) => dispatch => { 
        axios.get(`${config.api}/account/requests/view/${request_id}`).then(response => {

            dispatch({ type: GET_REQUEST, payload: response.data })

        }).catch(error => console.error(error))
    },

    accountCancelRequest = ({ request_id }) => dispatch => {
        axios.post(`${config.api}/account/requests/remove/${request_id}`).then(response =>

            dispatch({ type: CANCEL_REQUEST, payload: response.data })

        ).catch(error => console.error(error))
    },

    accountCleanRequest = () => ({ type: CLEAN_REQUEST })


export default {
    accountGetRequests,
    accountGetRequest,
    accountCancelRequest,
    accountCleanRequest
}