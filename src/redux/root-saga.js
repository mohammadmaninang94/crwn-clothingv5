import { all, call } from 'redux-saga/effects';

import { onFetchCollectionStart } from './shop/shop.sagas';

function* rootSaga() { yield all([call(onFetchCollectionStart)]) }

export default rootSaga;