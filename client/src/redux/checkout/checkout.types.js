const checkoutActionTypes = {
    UPDATE_SHIPPING_DETAILS: 'UPDATE_SHIPPING_DETAILS',
    UPDATE_BILLING_DETAILS : 'UPDATE_BILLING_DETAILS ',
    CALCULATE_SHIPPING_FEE_START: 'CALCULATE_SHIPPING_FEE_START',
    CALCULATE_SHIPPING_FEE_SUCCESS: 'CALCULATE_SHIPPING_FEE_SUCCESS',
    CALCULATE_SHIPPING_FEE_FAILED: 'CALCULATE_SHIPPING_FEE_FAILED',
    UPDATE_STEP: 'UPDATE_STEP',
    CREATE_STRIPE_PAYMENT_INTENT_START: 'CREATE_STRIPE_PAYMENT_INTENT_START',
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS: 'CREATE_STRIPE_PAYMENT_INTENT_SUCCESS',
    CREATE_STRIPE_PAYMENT_INTENT_FAILED: 'CREATE_STRIPE_PAYMENT_INTENT_FAILED',
    UPDATE_PAYMENT_DISABLED: 'UPDATE_PAYMENT_DISABLED',
    UPDATE_PAYMENT_ERROR: 'UPDATE_PAYMENT_ERROR',
    CONFIRM_STRIPE_CARD_PAYMENT_START: 'CONFIRM_STRIPE_CARD_PAYMENT_START',
    CONFIRM_STRIPE_CARD_PAYMENT_SUCCESS: 'CONFIRM_STRIPE_CARD_PAYMENT_SUCCESS',
    CONFIRM_STRIPE_CARD_PAYMENT_FAILED: 'CONFIRM_STRIPE_CARD_PAYMENT_FAILED',
};

export default checkoutActionTypes;