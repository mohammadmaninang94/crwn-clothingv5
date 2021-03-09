import shopActionTypes from './shop.types.js';

export const updateCollections = collectionsMap => ({
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});