import { 
    GET_USERS, GET_USER, UPDATE_USER, REMOVE_USER, GET_USER_REQUESTS
} from '../actions/types.js'

export default ( state = {}, action ) =>
{
    switch( action.type )
    {

        case GET_USERS:
            return { ...state, ...action.payload }            
        break

        case GET_USER:
            return { ...state, ...action.payload }            
        break
        
        case UPDATE_USER:
            return { ...state, ...action.payload }            
        break
        
        case REMOVE_USER:
            return { ...state, ...action.payload }            
        break

        case GET_USER_REQUESTS:

            return { ...state, ...action.payload }            
        break
        
        default: return state

    }
}