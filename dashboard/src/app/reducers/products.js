import { 
    CREATE_PRODUCT, GET_PRODUCTS, GET_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, UPDATE_IMAGES
} from '../actions/types.js'

export default ( state = {}, action ) =>
{
    switch( action.type )
    {

        case CREATE_PRODUCT:
            return { ...state, ...action.payload }            
        break

        case GET_PRODUCTS:
            return { ...state, ...action.payload }            
        break

        case GET_PRODUCT:
            return { ...state, ...action.payload }            
        break

        case UPDATE_PRODUCT:
            return { ...state, ...action.payload }            
        break

        case REMOVE_PRODUCT:
            return { ...state, ...action.payload }            
        break

        case UPDATE_IMAGES:
            return { ...state, ...action.payload }            
        break
        
        default: return state

    }
}