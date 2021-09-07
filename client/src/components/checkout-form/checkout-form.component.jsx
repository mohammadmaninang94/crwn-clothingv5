import { useSelector } from 'react-redux';

import { selectCheckoutStep } from '../../redux/checkout/checkout.selectors';

import ShippingForm from './shipping-form.component';
import BillingForm from './billing-form.component';

import {
    CheckoutFormContainer, CheckoutFormSlug,
    CheckoutFormSlugItem, CheckoutFormWrapper
} from './checkout-form.styles';

const CheckoutForm = () => {
    const step = useSelector(selectCheckoutStep);
    return (
        <CheckoutFormContainer>
            <CheckoutFormSlug>
                <CheckoutFormSlugItem isActive={true}>Cart</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={true}>Shipping</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={step === 3 ? true : false}>Payment</CheckoutFormSlugItem>
            </CheckoutFormSlug>
            <CheckoutFormWrapper>
                <ShippingForm step={step}/>
                <BillingForm step={step} />
            </CheckoutFormWrapper>
        </CheckoutFormContainer>
    )
};

export default CheckoutForm;