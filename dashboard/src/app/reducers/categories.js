import { 
    CREATE_CATEGORY, GET_CATEGORIES, GET_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY
} from '../actions/types.js'

export default ( state = {}, action ) =>
{
    switch( action.type )
    {

        case GET_CATEGORIES:
            return { ...state, ...action.payload }            
        break

        case GET_CATEGORY:
            return { ...state, ...action.payload }            
        break

        case UPDATE_CATEGORY:
            return { ...state, ...action.payload }            
        break

        default: return state

    }
}