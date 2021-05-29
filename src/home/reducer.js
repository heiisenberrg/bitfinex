import Constants from './constants';

const initialState = {
    tickers: []
};

const HomeReducer = (state = initialState, action) => {
    switch(action.type) {
        case Constants.GET_TICKERS:
            return state;
        case Constants.GET_TICKERS_SUCCESS:
            return { ...state, tickers: action.data};
        case Constants.GET_TICKERS_FAILURE:
            return state;
        default:
            return state;
    }
}

export default HomeReducer;