import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';


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

    const handleChange = event => {
        const { name, value } = event.target;
        setCheckout({ ...checkout, [name]: value });
    };

    const { mobilePhoneNo, shippingFirstName, shippingLastName,
        shippingAddress1, shippingAddress2, shippingProvince, shippingEmailAddress,
        shippingZipCode, shippingRegion, shippingMobileNo } = checkout;

    return (
        <form>
            <fieldset>
                <legend>Contact Information</legend>
                <FormInput label='Mobile Phone Number' type='text'
                    name='mobilePhoneNo' value={mobilePhoneNo}
                    handleChange={handleChange} required />
            </fieldset>
            <fieldset>
                <legend>Shipping address</legend>
                <FormInput label='First Name' type='text'
                    name='shippingFirstName' value={shippingFirstName}
                    handleChange={handleChange} required />
                <FormInput
                    label='Last Name' type='text'
                    name='shippingLastName' value={shippingLastName}
                    handleChange={handleChange} required />
                <FormInput
                    label='Email address' type='text'
                    name='shippingEmailAddress' value={shippingEmailAddress}
                    handleChange={handleChange} required />
                <FormInput
                    label='Unit/House No. & Street Name' type='text'
                    name='shippingAddress1' value={shippingAddress1}
                    handleChange={handleChange} required />
                <FormInput
                    label='Barangay, City and Municipality' type='text'
                    name='shippingAddress2' value={shippingAddress2}
                    handleChange={handleChange} required />
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
                <FormInput
                    label='Mobile Number' type='text'
                    name='shippingMobileNo' value={shippingMobileNo}
                    handleChange={handleChange} required />
            </fieldset>
            <CustomButton >Continue to shipping</CustomButton>
        </form>
    )
};

export default CheckoutForm;