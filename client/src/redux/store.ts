import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    applyMiddleware(...middlewares)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);