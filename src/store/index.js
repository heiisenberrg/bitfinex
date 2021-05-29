import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducer';
import rootSagas from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [createLogger({ collapsed: false }), sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: true
    })
  : compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSagas);

export { store };
