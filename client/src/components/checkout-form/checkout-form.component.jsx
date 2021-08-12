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
                <CheckoutFormSlugItem isActive={true}>Information</CheckoutFormSlugItem>
                <CheckoutFormSlugItem>Shipping Method</CheckoutFormSlugItem>
                <CheckoutFormSlugItem>Payment Method</CheckoutFormSlugItem>
            </CheckoutFormSlug>
            <CheckoutFormWrapper>
                <form>
                    <CheckoutFormFieldset>
                        <CheckoutFormLegend>Contact Information</CheckoutFormLegend>
                        <FormInput label='Mobile Phone Number' type='tel'
                            name='mobilePhoneNo' value={mobilePhoneNo}
                            handleChange={handleChange} required />
                    </CheckoutFormFieldset>
                    <CheckoutFormFieldset>
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
                    </CheckoutFormFieldset>
                    <CheckoutFormButtonContainer>
                        <CheckoutBackButton isLink={true} onClick={() => {
                            history.push('/cart');
                        }}><BackArrow>&larr;</BackArrow>Back to Cart</CheckoutBackButton>
                        <CustomButton>Continue to shipping</CustomButton>
                    </CheckoutFormButtonContainer>
                </form>
            </CheckoutFormWrapper>
        </CheckoutFormContainer>
    )
};

export default CheckoutForm;