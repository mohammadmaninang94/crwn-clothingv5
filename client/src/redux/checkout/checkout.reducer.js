import checkoutActionTypes from "./checkout.types";

const INITIAL_SHIPPING_FEE_MESSAGE = 'Calculated at next step';

const INITIAL_STATE = {
    shippingDetails: {
        firstName: '', lastName: '', mobileNo: '', emailAddress: '',
        address1: '', cityMun: '', province: '',
        region: '', zipCode: '', brgy: ''
    },
    billingDetails: {
        firstName: '', lastName: '', mobileNo: '', emailAddress: '',
        address1: '', cityMun: '', province: '',
        region: '', zipCode: '', brgy: ''
    },
    shippingFee: 0,
    isFetchingShippingFee: false,
    shippingFeeMessage: INITIAL_SHIPPING_FEE_MESSAGE,
    paymentType: 'COD',
    step: 2
};


const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case checkoutActionTypes.UPDATE_SHIPPING_DETAILS:
            return {
                ...state,
                shippingDetails: action.payload               
            }
        case checkoutActionTypes.UPDATE_BILLINGING_DETAILS:
            return {
                ...state,
                billingDetails: action.payload
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