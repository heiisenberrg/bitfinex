import axios from 'axios';

export const fetchTickers = () => {
    return axios({ 
        method: 'get', 
        url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tDOGE:USD,tUSTUSD,tXRPUSD"
    });
};