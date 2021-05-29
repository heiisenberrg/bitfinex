import { takeEvery } from 'redux-saga/effects';
import { getTickers } from '../home/saga';
import Constants from '../home/constants';

export default function* saga() {
	yield takeEvery(Constants.GET_TICKERS, getTickers);
}
