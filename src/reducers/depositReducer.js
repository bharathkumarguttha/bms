const initialState = {
    availableBalance: 0
}
const depositReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DEPOSIT_AMOUNT':
            return {
                ...state,
                availableBalance: state.availableBalance + action.amount
            }
        default:
            return state;
    }
}

export default depositReducer;