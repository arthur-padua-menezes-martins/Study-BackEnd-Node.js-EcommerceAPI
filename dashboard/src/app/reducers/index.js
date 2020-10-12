import { combineReducers } from 'redux'
import usersReducers from './users.js'
import categoriesReducers from './categories'
import productsReducers from './products'
import requestsReducers from './requests.js'


const reducers = combineReducers({
    users: usersReducers,
    categories: categoriesReducers,
    products: productsReducers,
    requests: requestsReducers,
})


export default reducers