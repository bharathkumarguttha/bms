const initialState = {
    loanData: {}
}
const loanReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_LOAN':
            return {
                ...state,
                loanData: action.loanData
            }
        default:
            return state;
    }
}

export default loanReducer;