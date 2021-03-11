import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectShopCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : null
);

export const selectShopCollection = memoize(collectionParamUrl => createSelector(
    [selectShopCollections],
    collections => collections ? collections[collectionParamUrl] : null
));

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShopCollections],
    collection => !!collection
);