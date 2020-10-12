import 
{ 
    GET_REQUESTS, GET_REQUEST, REMOVE_REQUEST, CLEAR_REQUEST, POST_REQUEST_PAYMENTS_STATUS
} from '../actions/types.js'

export default ( state = {}, action ) =>
{
    switch( action.type )
    {

        case GET_REQUESTS:
            return { ...state, ...action.payload }            
        break

        case GET_REQUEST:
            return { ...state, ...action.payload } 
        break

        case REMOVE_REQUEST:
            return { ...state, ...action.payload } 
        break

        case CLEAR_REQUEST:
            return { ...state, ...action.payload } 
        break

        case POST_REQUEST_PAYMENTS_STATUS:
            return { ...state, ...action.payload } 
        break
        
        default: return state

    }
}