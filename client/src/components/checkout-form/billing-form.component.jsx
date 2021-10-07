import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import {
    updateCheckoutStep, updateBillingDetails, confirmCODPaymentStart,
    fetchStripePaymentIntentStart, updatePaymentDisabled,
    updatePaymentError, confirmStripeCardPaymentStart
} from '../../redux/checkout/checkout.actions';

import {
    selectBillingDetails, selectPaymentDisabled,
    selectPaymentProcessing, selectPaymentError, selectPaymentSucceeded
} from '../../redux/checkout/checkout.selectors';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import CustomButton from './../custom-button/custom-button.component';

import { GetDropdownData, GetDropdownDataByCode } from './checkout-form.utils';

import {
    PaymentTypeContainer, CheckoutFormFieldset, CheckoutFormLegend,
    CheckoutFormButtonContainer, CustomInputWrapper, FormInputContainer,
    CheckoutBackButton, BackArrow, PaymentMessageContainer
} from "./checkout-form.styles";

const BillingForm = ({ step }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const reduxBillingDetails = useSelector(selectBillingDetails);
    const [billingDetails, setBillingDetails] = useState(reduxBillingDetails);
    const [dropdownAddress, setDropdownAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });
    const { firstName, lastName, mobileNo, emailAddress,
        address1, cityMun, province, barangay,
        region, zipCode } = billingDetails;
    const [paymentType, setPaymentType] = useState('COD');

    // selectors
    const paymentDisbaled = useSelector(selectPaymentDisabled);
    const paymentProcessing = useSelector(selectPaymentProcessing);
    const paymentError = useSelector(selectPaymentError);
    const paymentSucceeded = useSelector(selectPaymentSucceeded);

    const handleSubmit = async event => {
        event.preventDefault();
        dispatch(updateBillingDetails(billingDetails));
        if (paymentType === 'COD') {
            dispatch(confirmCODPaymentStart());
        } else {
            dispatch(confirmStripeCardPaymentStart(stripe, elements, CardElement));
        }
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

    const handlePaymentTypeChange = event => {
        const { value } = event.target;
        setPaymentType(value);
    }

    const handleStripeChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        dispatch(updatePaymentDisabled(event.empty));
        dispatch(updatePaymentError(event.error ? event.error.message : ""));
    };

    useEffect(() => {
        const populatedDropdowns = () => {
            const dropdownObj = GetDropdownData(region, province, cityMun, barangay);
            setDropdownAddress({ ...dropdownAddress, ...dropdownObj });
        };

        populatedDropdowns();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(fetchStripePaymentIntentStart());
    }, [dispatch]);

    const cardOptions = {
        style: {
            base: {
                color: "black",
                fontWeight: 300,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                letterSpacing: "2px",
                ":-webkit-autofill": {
                    color: "#fce883"
                },
                "::placeholder": {
                    color: "rgb(98, 102, 102)"
                }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        },
        hidePostalCode: true
    };

    const buttonDisabled = paymentType === 'stripe' && (paymentDisbaled || paymentProcessing || paymentSucceeded) ?
        true : false;

    const reqAttr = paymentType === 'COD' ? false : true;

    return (
        <form onSubmit={handleSubmit} className={step === 3 ? 'show' : 'hide'}>
            <CheckoutFormFieldset className='show'>
                <CheckoutFormLegend>Payment Type</CheckoutFormLegend>
                <PaymentTypeContainer>
                    <FormInput label='Cash on delivery' type='radio'
                        name='paymentType' value='COD' checked={paymentType === 'COD' ? "checked" : ""}
                        handleChange={handlePaymentTypeChange} required />
                    <FormInput label='Credit Card' type='radio'
                        name='paymentType' value='stripe' checked={paymentType === 'stripe' ? "checked" : ""}
                        handleChange={handlePaymentTypeChange} required disabled={paymentDisbaled} />
                    {/*<FormInput label='Gcash' type='radio'
                        name='paymentType' value='GCash' checked={paymentType === 'GCash' ? "checked" : ""}
                        handleChange={handlePaymentTypeChange} required />
                    <FormInput label='GrabPay' type='radio'
                        name='paymentType' value='GrabPay' checked={paymentType === 'GrabPay' ? "checked" : ""}
                        handleChange={handlePaymentTypeChange} required />
                    <FormInput label='Credit/Debit Card' type='radio'
                        name='paymentType' value='CreditCard' checked={paymentType === 'CreditCard' ? "checked" : ""}
                        handleChange={handlePaymentTypeChange} required />*/}
                </PaymentTypeContainer>
            </CheckoutFormFieldset>
            <CheckoutFormFieldset className={paymentType === 'COD' ? "hide" : "show"}>
                <CheckoutFormLegend>Billing address</CheckoutFormLegend>
                <FormInputContainer>
                    <CustomInputWrapper>
                        <FormInput label='First Name' type='text'
                            name='firstName' value={firstName}
                            handleChange={handleChange} required={reqAttr} />
                        <FormInput
                            label='Last Name' type='text'
                            name='lastName' value={lastName}
                            handleChange={handleChange} required={reqAttr} />
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormInput
                            label='Email address' type='email'
                            name='emailAddress' value={emailAddress}
                            handleChange={handleChange} required={reqAttr} />
                        <FormInput
                            label='Mobile Number' type='text'
                            name='mobileNo' value={mobileNo}
                            handleChange={handleChange} required={reqAttr} />
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormSelect name='region' value={region}
                            label='Region' handleChange={handleChange} required={reqAttr}>
                            <option value=''>Region</option>
                            {dropdownAddress.regions.map(({ name, reg_code }) => (
                                <option key={`billing-${reg_code}`} value={name} data-code={reg_code}>{name}</option>
                            ))}
                        </FormSelect>
                        <FormSelect name='province' value={province}
                            handleChange={handleChange} required={reqAttr}>
                            <option value=''>Province</option>
                            {dropdownAddress.provinces ?
                                dropdownAddress.provinces.map(({ name, prov_code }) => (
                                    <option key={`billing-${prov_code}`} value={name} data-code={prov_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormSelect name='cityMun' value={cityMun}
                            handleChange={handleChange} required={reqAttr}>
                            <option value=''>City or Municipality</option>
                            {dropdownAddress.cityAndMun ?
                                dropdownAddress.cityAndMun.map(({ name, mun_code }) => (
                                    <option key={`billing-${mun_code}`} value={name} data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                        <FormSelect name='barangay' value={barangay}
                            handleChange={handleChange} required={reqAttr}>
                            <option value=''>Barangay</option>
                            {dropdownAddress.barangays ?
                                dropdownAddress.barangays.map(({ name, mun_code }) => (
                                    <option key={`billing-${name}`} value={name} data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <FormSelect name='zipCode' value={zipCode}
                        handleChange={handleChange} required={reqAttr}>
                        <option value=''>Zip Code</option>
                        {dropdownAddress.zipCodes ?
                            dropdownAddress.zipCodes.map(code => (
                                <option key={`billing-${code}`} value={code}>{code}</option>
                            )) : null}
                    </FormSelect>
                    <FormInput
                        label='Unit/House No. & Street Name' type='text'
                        name='address1' value={address1}
                        handleChange={handleChange} required={reqAttr} />
                    <CardElement
                        options={cardOptions}
                        onChange={handleStripeChange}
                    />
                </FormInputContainer>
            </CheckoutFormFieldset>
            {paymentError ? <PaymentMessageContainer>{paymentError}</PaymentMessageContainer> : null}
            <CheckoutFormButtonContainer className={paymentType.toLocaleLowerCase()}>
                <CheckoutBackButton type="button" isLink={true} onClick={() => {
                    dispatch(updateBillingDetails(billingDetails));
                    dispatch(updateCheckoutStep(2));
                }}><BackArrow>&larr; </BackArrow>Back to Shipping</CheckoutBackButton>
                <CustomButton type="submit" disabled={buttonDisabled}>Place Order</CustomButton>
            </CheckoutFormButtonContainer>
        </form>
    )
};

export default BillingForm;