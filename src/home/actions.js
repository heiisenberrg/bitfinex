import Constants from './constants';

export const getTickers = () => ({
    type: Constants.GET_TICKERS
});

export const getTickersSuccess = (data) => ({
    type: Constants.GET_TICKERS_SUCCESS,
    data
});

export const getTickersFailure = (error) => ({
    type: Constants.GET_TICKERS_FAILURE,
    error
});