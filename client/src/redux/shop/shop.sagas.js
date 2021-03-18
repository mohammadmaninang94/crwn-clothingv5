import { all, takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import shopActionTypes from './shop.types';

export function* fetchCollections() {
    try {
        const collectionsRef = firestore.collection('collections');
        const collectionsSnapshot = yield collectionsRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, collectionsSnapshot);
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