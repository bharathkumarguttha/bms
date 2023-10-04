import { combineReducers } from 'redux';
import depositReducer from './depositReducer';
import loanReducer from './loanReducer';
const rootReducer = combineReducers({
    deposit: depositReducer,
    loan: loanReducer
})

export default rootReducer;