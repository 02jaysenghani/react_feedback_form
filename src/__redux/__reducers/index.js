import AuthReducers from './auth'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    authData: AuthReducers
})

export default allReducers