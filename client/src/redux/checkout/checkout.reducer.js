import checkoutActionTypes from "./checkout.types";

const INITIAL_SHIPPING_FEE_MESSAGE = 'Calculated at next step';

const INITIAL_STATE = {
    shippingDetails: {
        firstName: '', lastName: '', mobileNo: '', emailAddress: '',
        address1: '', cityMun: '', province: '',
        region: '', zipCode: '', barangay: ''
    },
    billingDetails: {
        firstName: '', lastName: '', mobileNo: '', emailAddress: '',
        address1: '', cityMun: '', province: '',
        region: '', zipCode: '', barangay: ''
    },
    paymentDetails: {
        paymentType: 'COD',
        successful: false,
        processing: false,
        disabled: false,
        clientSecret: '',
        error: ''
    },
    shippingFee: 0,
    isFetchingShippingFee: false,
    shippingFeeMessage: INITIAL_SHIPPING_FEE_MESSAGE,
    step: 2
};


const checkoutReducer = (state = INITIAL_STATE, action) => {
    const paymentDetails = state.paymentDetails;
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
                shippingFeeMessage: 'Calculating...'
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
        case checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_START:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    successful: false,
                    processing: false,
                    disabled: true,
                    clientSecret: '',
                    error: ''
                }
            }
        case checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_SUCCESS:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    successful: false,
                    processing: false,
                    disabled: false,
                    clientSecret: action.payload,
                    error: ''
                }
            }
        case checkoutActionTypes.CREATE_STRIPE_PAYMENT_INTENT_FAILED:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    successful: false,
                    processing: false,
                    disabled: false,
                    clientSecret: '',
                    error: action.payload
                }
            }
        case checkoutActionTypes.UPDATE_PAYMENT_DISABLED:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    disabled:  action.payload
                }
            }
        default:
            return state;
    }
}

export default checkoutReducer;