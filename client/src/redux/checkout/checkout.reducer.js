import checkoutActionTypes from "./checkout.types";

const INITIAL_SHIPPING_FEE_MESSAGE = 'Calculated at next step';

const checkoutState = {
    id: null,
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
        succeeded: false,
        processing: false,
        disabled: false,
        clientSecret: '',
        message: '',
        error: ''
    },
    shippingFee: null,
    isFetchingShippingFee: false,
    shippingFeeMessage: INITIAL_SHIPPING_FEE_MESSAGE,
    step: 2
};

const INITIAL_STATE = JSON.parse(JSON.stringify(checkoutState));

const checkoutReducer = (state = INITIAL_STATE, action) => {
    const paymentDetails = state.paymentDetails;
    const shippingDetails = state.shippingDetails;
    switch (action.type) {
        case checkoutActionTypes.UPDATE_ID:
            return {
                ...state,
                id: action.payload
            }
        case checkoutActionTypes.UPDATE_SHIPPING_DETAILS:
            return {
                ...state,
                shippingDetails: action.payload
            }
        case checkoutActionTypes.UPDATE_BILLING_DETAILS:
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
                shippingDetails: { //to recalculate shipping fee in shipping-form component
                    ...shippingDetails,
                    zipCode: ''
                },
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
                    succeeded: false,
                    processing: true,
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
                    succeeded: false,
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
                    succeeded: false,
                    processing: false,
                    disabled: true,
                    clientSecret: '',
                    message: action.payload
                }
            }
        case checkoutActionTypes.UPDATE_PAYMENT_DISABLED:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    disabled: action.payload
                }
            }
        case checkoutActionTypes.UPDATE_PAYMENT_ERROR:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    error: action.payload
                }
            }
        case checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_START:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    processing: true,
                    disabled: true,
                    paymentType: 'stripe',
                    error: ''
                }
            }
        case checkoutActionTypes.CONFIRM_COD_PAYMENT_START:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    processing: true,
                    disabled: true,
                    paymentType: 'COD',
                    error: ''
                }
            }
        case checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_SUCCESS:
        case checkoutActionTypes.CONFIRM_COD_PAYMENT_SUCCESS:
            return JSON.parse(JSON.stringify(checkoutState));
        case checkoutActionTypes.CONFIRM_STRIPE_CARD_PAYMENT_FAILED:
        case checkoutActionTypes.CONFIRM_COD_PAYMENT_FAILED:
            return {
                ...state,
                paymentDetails: {
                    ...paymentDetails,
                    succeeded: false,
                    processing: false,
                    disabled: false,
                    error: action.payload
                }
            }
        case checkoutActionTypes.CREATE_CHECKOUT_SUCCESS:
            return {
                ...state,
                id: action.payload
            }
        case checkoutActionTypes.CREATE_CHECKOUT_FAILED:
            return {
                ...state,
                shippingFeeMessage: action.payload
            }
        default:
            return state;
    }
}

export default checkoutReducer;