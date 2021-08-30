import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { philData, address } from 'addresspinas'

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import CustomButton from './../custom-button/custom-button.component';

import {
    CheckoutFormContainer, CheckoutFormFieldset, CheckoutFormLegend,
    CustomInputWrapper, CheckoutFormSlug, CheckoutFormSlugItem, FormInputContainer,
    CheckoutFormButtonContainer, CheckoutBackButton, BackArrow, CheckoutFormWrapper,
    PaymentTypeContainer
} from './checkout-form.styles';


const CheckoutForm = () => {
    const [checkout, setCheckout] = useState({
        shippingFirstName: '', shippingLastName: '', shippingAddress1: '',
        shippingCityMun: '', shippingProvince: '', shippingZipCode: '',
        shippingEmailAddress: '', shippingRegion: '', shippingMobileNo: '',
        billingFirstName: '', billingLastName: '', billingAddress1: '',
        billingAddress2: '', billingProvince: '', billingZipCode: '',
        billingEmailAddress: '', billingRegion: '', billingMobileNo: '',
        paymentType: 'COD'
    });

    const [philippineAddress, setPhilippineAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });

    const [step, setStep] = useState(2);

    const history = useHistory();

    const handleShippingSubmit = event => {
        event.preventDefault();
        setStep(3);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setCheckout({ ...checkout, [name]: value });

        if (event.target.type === 'select-one') {
            const selectedndex = event.target.selectedIndex;
            const code = event.target[selectedndex].getAttribute('data-code');
            switch (name) {
                case 'shippingRegion':
                    const { provinces } = address.getProvinceOfRegion(code);
                    setPhilippineAddress({ ...philippineAddress, provinces: provinces });
                    break;
                case 'shippingProvince':
                    const { cityAndMun } = address.getCityMunOfProvince(code);
                    setPhilippineAddress({ ...philippineAddress, cityAndMun: cityAndMun });
                    break;
                case 'shippingCityMun':
                    const { barangays } = address.getBarangaysOfCityMun(code);
                    setPhilippineAddress({ ...philippineAddress, barangays: barangays });
                    break;
                case 'shippingBrgy':
                    const zipCodes = address.getZipcode({ name: '', mun_code: code });
                    setPhilippineAddress({ ...philippineAddress, zipCodes: zipCodes });
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        const { regions } = philData.allRegions;
        setPhilippineAddress({ ...philippineAddress, regions: regions });
    }, [setPhilippineAddress]);

    const {
        shippingFirstName, shippingLastName, shippingAddress1,
        shippingEmailAddress, shippingMobileNo,
        billingFirstName, billingLastName, billingAddress1,
        billingAddress2, billingProvince, billingEmailAddress,
        billingZipCode, billingRegion, billingMobileNo, paymentType
    } = checkout;

    return (
        <CheckoutFormContainer>
            <CheckoutFormSlug>
                <CheckoutFormSlugItem isActive={true}>Cart</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={true}>Shipping</CheckoutFormSlugItem>
                <CheckoutFormSlugItem isActive={step === 3 ? true : false}>Payment</CheckoutFormSlugItem>
            </CheckoutFormSlug>
            <CheckoutFormWrapper>
                <form onSubmit={handleShippingSubmit} className={step === 2 ? 'show' : 'hide'}>
                    <CheckoutFormFieldset className='show'>
                        <CheckoutFormLegend>Shipping address</CheckoutFormLegend>
                        <FormInputContainer>
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
                            <CustomInputWrapper>
                                <FormSelect name='shippingRegion'
                                    label='Region'
                                    handleChange={handleChange}>
                                    <option value=''>Region</option>
                                    {philippineAddress.regions.map(({ name, reg_code }) => (
                                        <option key={reg_code} value={reg_code} data-code={reg_code}>{name}</option>
                                    ))}
                                </FormSelect>
                                <FormSelect name='shippingProvince' handleChange={handleChange}>
                                    <option value=''>Province</option>
                                    {philippineAddress.provinces ?
                                        philippineAddress.provinces.map(({ name, prov_code }) => (
                                            <option key={prov_code} value={prov_code} data-code={prov_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <CustomInputWrapper>
                                <FormSelect name='shippingCityMun' handleChange={handleChange}>
                                    <option value=''>City or Municipality</option>
                                    {philippineAddress.cityAndMun ?
                                        philippineAddress.cityAndMun.map(({ name, mun_code }) => (
                                            <option key={mun_code} value={mun_code} data-code={mun_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                                <FormSelect name='shippingBrgy' handleChange={handleChange}>
                                    <option value=''>Barangay</option>
                                    {philippineAddress.barangays ?
                                        philippineAddress.barangays.map(({ name, mun_code }) => (
                                            <option key={name} value={mun_code} data-code={mun_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <FormSelect name='shippingZipCode' handleChange={handleChange}>
                                <option value=''>Zip Code</option>
                                {philippineAddress.zipCodes ?
                                    philippineAddress.zipCodes.map(zipCode => (
                                        <option key={zipCode} value={zipCode}>{zipCode}</option>
                                    )) : null}
                            </FormSelect>
                            <FormInput
                                label='Unit/House No. & Street Name' type='text'
                                name='shippingAddress1' value={shippingAddress1}
                                handleChange={handleChange} required />
                        </FormInputContainer>
                        <CheckoutFormButtonContainer>
                            <CheckoutBackButton type="button" isLink={true} onClick={() => {
                                history.push('/cart');
                            }}><BackArrow>&larr;</BackArrow>Back to Cart</CheckoutBackButton>
                            <CustomButton type="submit">Continue to payment</CustomButton>
                        </CheckoutFormButtonContainer>
                    </CheckoutFormFieldset>
                </form>
                <form className={step === 3 ? 'show' : 'hide'}>
                    <CheckoutFormFieldset className='show'>
                        <CheckoutFormLegend>Payment Type</CheckoutFormLegend>
                        <PaymentTypeContainer>
                            <FormInput label='Cash on delivery' type='radio'
                                name='paymentType' value='COD' checked={paymentType === 'COD' ? "checked" : ""}
                                handleChange={handleChange} required />
                            <FormInput label='Gcash' type='radio'
                                name='paymentType' value='GCash'
                                handleChange={handleChange} required />
                            <FormInput label='GrabPay' type='radio'
                                name='paymentType' value='GrabPay'
                                handleChange={handleChange} required />
                            <FormInput label='Credit/Debit Card' type='radio'
                                name='paymentType' value='CreditCard'
                                handleChange={handleChange} required />
                        </PaymentTypeContainer>
                    </CheckoutFormFieldset>
                    <CheckoutFormFieldset className={paymentType === 'COD' ? "hide" : "show"}>
                        <CheckoutFormLegend>Billing address</CheckoutFormLegend>
                        <FormInputContainer>
                            <CustomInputWrapper>
                                <FormInput label='First Name' type='text'
                                    name='billingFirstName' value={billingFirstName}
                                    handleChange={handleChange} required />
                                <FormInput
                                    label='Last Name' type='text'
                                    name='billingLastName' value={billingLastName}
                                    handleChange={handleChange} required />
                            </CustomInputWrapper>
                            <CustomInputWrapper>
                                <FormInput
                                    label='Email address' type='email'
                                    name='billingEmailAddress' value={billingEmailAddress}
                                    handleChange={handleChange} required />
                                <FormInput
                                    label='Mobile Number' type='text'
                                    name='billingMobileNo' value={billingMobileNo}
                                    handleChange={handleChange} required />
                            </CustomInputWrapper>
                            <FormInput
                                label='Unit/House No. & Street Name' type='text'
                                name='billingAddress1' value={billingAddress1}
                                handleChange={handleChange} required />
                            <FormInput
                                label='Barangay, City and Municipality' type='text'
                                name='billingAddress2' value={billingAddress2}
                                handleChange={handleChange} required />
                            <CustomInputWrapper>
                                <FormInput
                                    label='Province' type='text'
                                    name='billingProvince' value={billingProvince}
                                    handleChange={handleChange} required />
                                <FormInput
                                    label='Zip Code' type='text'
                                    name='billingZipCode' value={billingZipCode}
                                    handleChange={handleChange} required />
                                <FormInput
                                    label='Region' type='text'
                                    name='billingRegion' value={billingRegion}
                                    handleChange={handleChange} required />
                            </CustomInputWrapper>
                        </FormInputContainer>
                    </CheckoutFormFieldset>
                    <CheckoutFormButtonContainer className={paymentType.toLocaleLowerCase()}>
                        <CheckoutBackButton type="button" isLink={true} onClick={() => {
                            setStep(2);
                        }}><BackArrow>&larr;</BackArrow>Back to Shipping</CheckoutBackButton>
                        <CustomButton type="submit">Place Order</CustomButton>
                    </CheckoutFormButtonContainer>
                </form>
            </CheckoutFormWrapper>
        </CheckoutFormContainer>
    )
};

export default CheckoutForm;