import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectShopCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

export const selectShopCollection = memoize(collectionParamUrl => createSelector(
    [selectShopCollections],
    collections => collections[collectionParamUrl]
));