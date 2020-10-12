/*basic modules************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
import axios from 'axios'
import config from '../../config.js'
axios.defaults.withCredentials = true;

/*types************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
import { GET_SUB_HEADERS } from '../types.js'

/*return************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
export default {

    getSubHeaders: () => async dispatch => {
        await axios.get(`${config.api}/search/*?select=actionfigures,camisas,canecas,colecionáveis,outros`).then(response => 

            dispatch({ type: GET_SUB_HEADERS, payload: response.data })

        ).catch(error => console.error(error))
    }

}