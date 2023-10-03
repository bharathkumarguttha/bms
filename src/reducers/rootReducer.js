import { combineReducers } from 'redux';
import depositReducer from './depositReducer';
const rootReducer = combineReducers({
    deposit: depositReducer
})

export default rootReducer;