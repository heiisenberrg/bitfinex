import { call, put } from 'redux-saga';
import { getTickersSuccess, getTickersFailure } from './actions';
import { fetchTickers } from './service';

export function* getTickers() {
    try {
       const response = yield call(fetchTickers);
       yield put(getTickersSuccess(response));
    } catch (err) {
       yield put(getTickersFailure(err));
    }
}

