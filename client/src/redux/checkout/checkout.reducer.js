import checkoutActionTypes from "./checkout.types";

const INITIAL_SHIPPING_FEE_MESSAGE = 'Calculated at next step';

const INITIAL_STATE = {
    shippingFirstName: '', shippingLastName: '', shippingAddress1: '',
    shippingCityMun: '', shippingProvince: '', shippingZipCode: '',
    shippingEmailAddress: '', shippingRegion: '', shippingMobileNo: '',
    billingFirstName: '', billingLastName: '', billingAddress1: '',
    billingAddress2: '', billingProvince: '', billingZipCode: '',
    billingEmailAddress: '', billingRegion: '', billingMobileNo: '',
    paymentType: 'COD', isFetchingShippingFee: false,
    shippingFee: 0, shippingFeeMessage: INITIAL_SHIPPING_FEE_MESSAGE,
    step: 2
};


const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case checkoutActionTypes.UPDATE_PROP:
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value
            }
        case checkoutActionTypes.CALCULATE_SHIPPING_FEE_START:
            return {
                ...state,
                isFetchingShippingFee: true,
                shippingFeeMessage: 'Calculating...',
            }
        case checkoutActionTypes.CALCULATE_SHIPPING_FEE_SUCCESS:
            return {
                ...state,
                isFetchingShippingFee: false,
                shippingFeeMessage: '',
                shippingFee: action.payload,
                step: 3
            }
        case checkoutActionTypes.CALCULATE_SHIPPING_FEE_FAILED:
            return {
                ...state,
                isFetchingShippingFee: false,
                shippingFeeMessage: action.payload,
                shippingFee: 0,
                step: 2
            }
        case checkoutActionTypes.UPDATE_STEP:
            return {
                ...state,
                step: action.payload
            }
        default:
            return state;
    }
}

export default checkoutReducer;