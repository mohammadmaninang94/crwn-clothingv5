import shopActionTypes from './shop.types.js';

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