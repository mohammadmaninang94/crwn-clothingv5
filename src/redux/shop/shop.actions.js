import shopActionTypes from './shop.types.js';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = message => ({
    type: shopActionTypes.FETCHING_COLLECTIONS_SUCCESS,
    payload: message
});

export const fetchCollectionStartAsync = () => dispatch => {
    dispatch(fetchCollectionsStart());

    const collectionsSnapshot = firestore.collection('collections');
    collectionsSnapshot.get().then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
};