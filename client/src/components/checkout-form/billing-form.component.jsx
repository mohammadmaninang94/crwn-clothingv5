import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateStep, updateBillingDetails } from '../../redux/checkout/checkout.actions';
import { selectBillingDetails, selectPaymentType } from '../../redux/checkout/checkout.selectors';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import CustomButton from './../custom-button/custom-button.component';

import { GetDropdownData, GetDropdownDataByCode } from './checkout-form.utils';

import {
    PaymentTypeContainer, CheckoutFormFieldset, CheckoutFormLegend,
    CheckoutFormButtonContainer, CustomInputWrapper, FormInputContainer,
    CheckoutBackButton, BackArrow
} from "./checkout-form.styles";

const BillingForm = ({ step }) => {
    const dispatch = useDispatch();
    const reduxBillingDetails = useSelector(selectBillingDetails);
    const reduxPaymentType = useSelector(selectPaymentType);

    const [billingDetails, setBillingDetails] = useState(reduxBillingDetails);
    const [paymentType, setPaymentType] = useState(reduxPaymentType);

    const [dropdownAddress, setDropdownAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });

    const { firstName, lastName, mobileNo, emailAddress,
        address1, cityMun, province, barangay,
        region, zipCode } = billingDetails;

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateBillingDetails(billingDetails));
        alert('Successfully placed order');
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setBillingDetails({ ...billingDetails, [name]: value });

        if (event.target.type === 'select-one') {
            const selectedndex = event.target.selectedIndex;
            const code = event.target[selectedndex].getAttribute('data-code');
            if (code) {
                const dropdownObj = GetDropdownDataByCode(name, code);
                setDropdownAddress({ ...dropdownAddress, ...dropdownObj });
            }
        }
    }

    const handleRadioChange = event => {
        const { value } = event.target;
        setPaymentType(value);
    };

    useEffect(() => {
        const populatedDropdowns = () => {
            const dropdownObj = GetDropdownData(region, province, cityMun, barangay);
            setDropdownAddress({ ...dropdownAddress, ...dropdownObj });
        };

        populatedDropdowns();
    }, []);

    return (
        <form onSubmit={handleSubmit} className={step === 3 ? 'show' : 'hide'}>
            <CheckoutFormFieldset className='show'>
                <CheckoutFormLegend>Payment Type</CheckoutFormLegend>
                <PaymentTypeContainer>
                    <FormInput label='Cash on delivery' type='radio'
                        name='paymentType' value='COD' checked={paymentType === 'COD' ? "checked" : ""}
                        handleChange={handleRadioChange} required />
                    <FormInput label='Gcash' type='radio'
                        name='paymentType' value='GCash'
                        handleChange={handleRadioChange} required />
                    <FormInput label='GrabPay' type='radio'
                        name='paymentType' value='GrabPay'
                        handleChange={handleRadioChange} required />
                    <FormInput label='Credit/Debit Card' type='radio'
                        name='paymentType' value='CreditCard'
                        handleChange={handleRadioChange} required />
                </PaymentTypeContainer>
            </CheckoutFormFieldset>
            <CheckoutFormFieldset className={paymentType === 'COD' ? "hide" : "show"}>
                <CheckoutFormLegend>Billing address</CheckoutFormLegend>
                <FormInputContainer>
                    <CustomInputWrapper>
                        <FormInput label='First Name' type='text'
                            name='firstName' value={firstName}
                            handleChange={handleChange} required />
                        <FormInput
                            label='Last Name' type='text'
                            name='lastName' value={lastName}
                            handleChange={handleChange} required />
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormInput
                            label='Email address' type='email'
                            name='emailAddress' value={emailAddress}
                            handleChange={handleChange} required />
                        <FormInput
                            label='Mobile Number' type='text'
                            name='mobileNo' value={mobileNo}
                            handleChange={handleChange} required />
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormSelect name='region' value={region}
                            label='Region' handleChange={handleChange} required>
                            <option value=''>Region</option>
                            {dropdownAddress.regions.map(({ name, reg_code }) => (
                                <option key={`billing-${reg_code}`} value={name} data-code={reg_code}>{name}</option>
                            ))}
                        </FormSelect>
                        <FormSelect name='province' value={province}
                            handleChange={handleChange} required>
                            <option value=''>Province</option>
                            {dropdownAddress.provinces ?
                                dropdownAddress.provinces.map(({ name, prov_code }) => (
                                    <option key={`billing-${prov_code}`} value={name} data-code={prov_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormSelect name='cityMun' value={cityMun}
                            handleChange={handleChange} required>
                            <option value=''>City or Municipality</option>
                            {dropdownAddress.cityAndMun ?
                                dropdownAddress.cityAndMun.map(({ name, mun_code }) => (
                                    <option key={`billing-${mun_code}`} value={name} data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                        <FormSelect name='barangay' value={barangay}
                            handleChange={handleChange} required>
                            <option value=''>Barangay</option>
                            {dropdownAddress.barangays ?
                                dropdownAddress.barangays.map(({ name, mun_code }) => (
                                    <option key={`billing-${name}`} value={name} data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <FormSelect name='zipCode' value={zipCode}
                        handleChange={handleChange} required>
                        <option value=''>Zip Code</option>
                        {dropdownAddress.zipCodes ?
                            dropdownAddress.zipCodes.map(code => (
                                <option key={`billing-${code}`} value={code}>{code}</option>
                            )) : null}
                    </FormSelect>
                    <FormInput
                        label='Unit/House No. & Street Name' type='text'
                        name='address1' value={address1}
                        handleChange={handleChange} required />
                </FormInputContainer>
            </CheckoutFormFieldset>
            <CheckoutFormButtonContainer className={paymentType.toLocaleLowerCase()}>
                <CheckoutBackButton type="button" isLink={true} onClick={() => {
                    dispatch(updateBillingDetails(billingDetails));
                    dispatch(updateStep(2));
                }}><BackArrow>&larr;</BackArrow>Back to Shipping</CheckoutBackButton>
                <CustomButton type="submit">Place Order</CustomButton>
            </CheckoutFormButtonContainer>
        </form>
    )
};

export default BillingForm;