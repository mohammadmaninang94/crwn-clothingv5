import shopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    message: ''
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.FETCHING_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case shopActionTypes.FETCHING_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case shopActionTypes.FETCHING_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;