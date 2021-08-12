import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import FormInput from '../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

import {
    CheckoutFormContainer, CheckoutFormFieldset, CheckoutFormLegend,
    CustomInputWrapper, CheckoutFormSlug, CheckoutFormSlugItem,
    CheckoutFormButtonContainer, CheckoutBackButton, BackArrow, CheckoutFormWrapper
} from './checkout-form.styles';


const CheckoutForm = () => {
    const [checkout, setCheckout] = useState({
        mobilePhoneNo: '',
        shippingFirstName: '',
        shippingLastName: '',
        shippingAddress1: '',
        shippingAddress2: '',
        shippingProvince: '',
        shippingZipCode: '',
        shippingEmailAddress: '',
        shippingRegion: '',
        shippingMobileNo: ''
    });

    const [step, setStep] = useState(2);

    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setCheckout({ ...checkout, [name]: value });
    };

    const { mobilePhoneNo, shippingFirstName, shippingLastName,
        shippingAddress1, shippingAddress2, shippingProvince, shippingEmailAddress,
        shippingZipCode, shippingRegion, shippingMobileNo } = checkout;

    return (
        <CheckoutFormContainer>
            <CheckoutFormSlug>
                <CheckoutFormSlugItem isActive={true}>Cart</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={true}>Shipping Information</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={step === 3 ? true : false}>Payment Method</CheckoutFormSlugItem>
            </CheckoutFormSlug>
            <CheckoutFormWrapper>
                <form>
                    <CheckoutFormFieldset className={step === 2 ? 'show' : 'hide'}>
                        <CheckoutFormLegend>Shipping address</CheckoutFormLegend>
                        <CustomInputWrapper>
                            <FormInput label='First Name' type='text'
                                name='shippingFirstName' value={shippingFirstName}
                                handleChange={handleChange} required />
                            <FormInput
                                label='Last Name' type='text'
                                name='shippingLastName' value={shippingLastName}
                                handleChange={handleChange} required />
                        </CustomInputWrapper>
                        <CustomInputWrapper>
                            <FormInput
                                label='Email address' type='email'
                                name='shippingEmailAddress' value={shippingEmailAddress}
                                handleChange={handleChange} required />
                            <FormInput
                                label='Mobile Number' type='text'
                                name='shippingMobileNo' value={shippingMobileNo}
                                handleChange={handleChange} required />
                        </CustomInputWrapper>
                        <FormInput
                            label='Unit/House No. & Street Name' type='text'
                            name='shippingAddress1' value={shippingAddress1}
                            handleChange={handleChange} required />
                        <FormInput
                            label='Barangay, City and Municipality' type='text'
                            name='shippingAddress2' value={shippingAddress2}
                            handleChange={handleChange} required />
                        <CustomInputWrapper>
                            <FormInput
                                label='Province' type='text'
                                name='shippingProvince' value={shippingProvince}
                                handleChange={handleChange} required />
                            <FormInput
                                label='Zip Code' type='text'
                                name='shippingZipCode' value={shippingZipCode}
                                handleChange={handleChange} required />
                            <FormInput
                                label='Region' type='text'
                                name='shippingRegion' value={shippingRegion}
                                handleChange={handleChange} required />
                        </CustomInputWrapper>
                        <CheckoutFormButtonContainer>
                            <CheckoutBackButton type="button" isLink={true} onClick={() => {
                                history.push('/cart');
                            }}><BackArrow>&larr;</BackArrow>Back to Cart</CheckoutBackButton>
                            <CustomButton type="button" onClick={() => {
                                setStep(3);
                            }}>Continue to payment</CustomButton>
                        </CheckoutFormButtonContainer>
                    </CheckoutFormFieldset>
                    <CheckoutFormFieldset className={step === 3 ? 'show' : 'hide'}>
                        <CheckoutFormLegend>Contact Information</CheckoutFormLegend>
                        <FormInput label='Mobile Phone Number' type='tel'
                            name='mobilePhoneNo' value={mobilePhoneNo}
                            handleChange={handleChange} required />
                        <CheckoutFormButtonContainer>
                            <CheckoutBackButton type="button" isLink={true} onClick={() => {
                                setStep(2);
                            }}><BackArrow>&larr;</BackArrow>Back to Shipping</CheckoutBackButton>
                            <CustomButton type="submit">Place Order</CustomButton>
                        </CheckoutFormButtonContainer>
                    </CheckoutFormFieldset>
                </form>
            </CheckoutFormWrapper>
        </CheckoutFormContainer >
    )
};

export default CheckoutForm;