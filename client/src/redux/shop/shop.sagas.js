import { all, takeLatest, call, put } from 'redux-saga/effects';

import { getCollectionDataToMap } from '../../firebase/firebase.firestore';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import shopActionTypes from './shop.types';

export function* fetchCollections() {
    try {
        const collectionsMap = yield getCollectionDataToMap();
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* onFetchCollectionStart() {
    yield takeLatest(shopActionTypes.FETCHING_COLLECTIONS_START, fetchCollections);
}

export default function* shopSagas() {
    yield all([call(onFetchCollectionStart)])
}