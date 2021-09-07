import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { philData, address } from 'addresspinas';
import { useSelector, useDispatch } from 'react-redux';

import { updateCheckout, fetchShippingFeeStart, updateStep } from '../../redux/checkout/checkout.actions';
import { selectCheckoutStep } from '../../redux/checkout/checkout.selectors';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import CustomButton from './../custom-button/custom-button.component';

import {
    CheckoutFormContainer, CheckoutFormFieldset, CheckoutFormLegend,
    CustomInputWrapper, CheckoutFormSlug, CheckoutFormSlugItem, FormInputContainer,
    CheckoutFormButtonContainer, CheckoutBackButton, BackArrow, CheckoutFormWrapper,
    PaymentTypeContainer
} from './checkout-form.styles';

const GetDropdownData = (selectedRegion, selectedProvince, selectedCityMun, selectedBrgy) => {
    let dropdownAddress = {}

    // populate Regions
    const { regions } = philData.allRegions;
    dropdownAddress.regions = regions;

    // populate Provinces
    if (selectedRegion) {
        const region = regions.find(({ name }) => name === selectedRegion);
        if (region) {
            const { provinces } = address.getProvinceOfRegion(region.reg_code);
            dropdownAddress.provinces = provinces;

            // populate City or Municipalitites
            if (selectedProvince) {
                const province = provinces.find(({ name }) => name === selectedProvince);
                if (province) {
                    const { cityAndMun } = address.getCityMunOfProvince(province.prov_code);
                    dropdownAddress.cityAndMun = cityAndMun;

                    // populate Barangays
                    if (selectedCityMun) {
                        const cityOrMun = cityAndMun.find(({ name }) => name === selectedCityMun);
                        if (cityOrMun) {
                            const { barangays } = address.getBarangaysOfCityMun(cityOrMun.mun_code);
                            dropdownAddress.barangays = barangays;

                            // populate Barangays
                            if (selectedBrgy) {
                                const barangay = barangays.find(({ name }) => name === selectedBrgy);
                                if (barangay) {
                                    const zipCodes = address.getZipcode({ name: '', mun_code: barangay.mun_code });
                                    dropdownAddress.zipCodes = zipCodes;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return dropdownAddress;
};


const CheckoutForm = () => {
    // const [checkout, setCheckout] = useState({
    //     shippingFirstName: '', shippingLastName: '', dropdownAddress1: '',
    //     shippingCityMun: '', shippingProvince: '', shippingZipCode: '',
    //     shippingEmailAddress: '', shippingRegion: '', shippingMobileNo: '',
    //     billingFirstName: '', billingLastName: '', billingAddress1: '',
    //     billingAddress2: '', billingProvince: '', billingZipCode: '',
    //     billingEmailAddress: '', billingRegion: '', billingMobileNo: '',
    //     paymentType: 'COD'
    // });

    const dispatch = useDispatch();
    const checkout = useSelector(state => state.checkout);
    const step = useSelector(selectCheckoutStep);

    const {
        shippingFirstName, shippingLastName, dropdownAddress1,
        shippingRegion, shippingProvince, shippingCityMun,
        shippingBrgy, shippingZipCode, shippingEmailAddress,
        shippingMobileNo, billingFirstName, billingLastName, billingAddress1,
        billingRegion, billingProvince, billingCityMun, billingBrgy,
        billingEmailAddress, billingMobileNo, paymentType
    } = checkout;


    const [dropdownAddress, setdropdownAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });

    const [billingAddress, setBillingAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });

    // const [step, setStep] = useState(2);

    const history = useHistory();

    const handleShippingSubmit = event => {
        event.preventDefault();
        dispatch(fetchShippingFeeStart());
    };

    const updateAddress = (isShipping, dropdownObj) => {
        if (isShipping) {
            setdropdownAddress({
                ...dropdownAddress, ...dropdownObj
            });
        } else {
            setBillingAddress({
                ...billingAddress, ...dropdownObj
            });
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        dispatch(updateCheckout([name], value));

        if (event.target.type === 'select-one') {
            const selectedndex = event.target.selectedIndex;
            const code = event.target[selectedndex].getAttribute('data-code');
            const isShipping = name.toLocaleLowerCase().includes('shipping');
            switch (name) {
                case 'shippingRegion':
                case 'billingRegion':
                    const { provinces } = address.getProvinceOfRegion(code);
                    updateAddress(isShipping, {
                        provinces: provinces,
                        cityAndMun: [], barangays: [], zipCodes: []
                    });
                    break;
                case 'shippingProvince':
                case 'billingProvince':
                    const { cityAndMun } = address.getCityMunOfProvince(code);
                    updateAddress(isShipping, {
                        cityAndMun: cityAndMun,
                        barangays: [], zipCodes: []
                    });
                    break;
                case 'shippingCityMun':
                case 'billingCityMun':
                    const { barangays } = address.getBarangaysOfCityMun(code);
                    updateAddress(isShipping, {
                        barangays: barangays,
                        zipCodes: []
                    });
                    break;
                case 'shippingBrgy':
                case 'billingBrgy':
                    const zipCodes = address.getZipcode({ name: '', mun_code: code });
                    updateAddress(isShipping, { zipCodes: zipCodes });
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        const populatedDropdowns = () => {
            const shippingDropdown = GetDropdownData(shippingRegion, shippingProvince, shippingCityMun, shippingBrgy);
            updateAddress(true, shippingDropdown);

            const billingDropdown = GetDropdownData(billingRegion, billingProvince, billingCityMun, billingBrgy);
            updateAddress(false, billingDropdown);
        };

        populatedDropdowns();
    }, []);

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
                                    label='Region' handleChange={handleChange} required>
                                    <option value=''>Region</option>
                                    {dropdownAddress.regions.map(({ name, reg_code }) =>
                                    (
                                        <option key={`shipping-${reg_code}`} value={name}
                                            data-code={reg_code} selected={shippingRegion === name}
                                        >{name}</option>
                                    ))}
                                </FormSelect>
                                <FormSelect name='shippingProvince' handleChange={handleChange} required>
                                    <option value=''>Province</option>
                                    {dropdownAddress.provinces ?
                                        dropdownAddress.provinces.map(({ name, prov_code }) => (
                                            <option key={`shipping-${prov_code}`} value={name}
                                                data-code={prov_code} selected={shippingProvince === name}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <CustomInputWrapper>
                                <FormSelect name='shippingCityMun' handleChange={handleChange} required>
                                    <option value=''>City or Municipality</option>
                                    {dropdownAddress.cityAndMun ?
                                        dropdownAddress.cityAndMun.map(({ name, mun_code }) => (
                                            <option key={`shipping-${mun_code}`} value={name}
                                                data-code={mun_code} selected={shippingCityMun === name}>{name}</option>
                                        )) : null}
                                </FormSelect>
                                <FormSelect name='shippingBrgy' handleChange={handleChange} required>
                                    <option value=''>Barangay</option>
                                    {dropdownAddress.barangays ?
                                        dropdownAddress.barangays.map(({ name, mun_code }) => (
                                            <option key={`shipping-${name}`} value={name}
                                                data-code={mun_code} selected={shippingBrgy === name}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <FormSelect name='shippingZipCode' handleChange={handleChange} required>
                                <option value=''>Zip Code</option>
                                {dropdownAddress.zipCodes ?
                                    dropdownAddress.zipCodes.map(zipCode => (
                                        <option key={`shipping-${zipCode}`} value={zipCode}
                                            selected={shippingZipCode === zipCode}>{zipCode}</option>
                                    )) : null}
                            </FormSelect>
                            <FormInput
                                label='Unit/House No. & Street Name' type='text'
                                name='dropdownAddress1' value={dropdownAddress1}
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
                            <CustomInputWrapper>
                                <FormSelect name='billingRegion'
                                    label='Region' handleChange={handleChange} required>
                                    <option value=''>Region</option>
                                    {billingAddress.regions.map(({ name, reg_code }) => (
                                        <option key={`billing-${reg_code}`} value={name} data-code={reg_code}>{name}</option>
                                    ))}
                                </FormSelect>
                                <FormSelect name='billingProvince' handleChange={handleChange} required>
                                    <option value=''>Province</option>
                                    {billingAddress.provinces ?
                                        billingAddress.provinces.map(({ name, prov_code }) => (
                                            <option key={`billing-${prov_code}`} value={name} data-code={prov_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <CustomInputWrapper>
                                <FormSelect name='billingCityMun' handleChange={handleChange} required>
                                    <option value=''>City or Municipality</option>
                                    {billingAddress.cityAndMun ?
                                        billingAddress.cityAndMun.map(({ name, mun_code }) => (
                                            <option key={`billing-${mun_code}`} value={name} data-code={mun_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                                <FormSelect name='billingBrgy' handleChange={handleChange} required>
                                    <option value=''>Barangay</option>
                                    {billingAddress.barangays ?
                                        billingAddress.barangays.map(({ name, mun_code }) => (
                                            <option key={`billing-${name}`} value={name} data-code={mun_code}>{name}</option>
                                        )) : null}
                                </FormSelect>
                            </CustomInputWrapper>
                            <FormSelect name='billingZipCode' handleChange={handleChange} required>
                                <option value=''>Zip Code</option>
                                {billingAddress.zipCodes ?
                                    billingAddress.zipCodes.map(zipCode => (
                                        <option key={`billing-${zipCode}`} value={zipCode}>{zipCode}</option>
                                    )) : null}
                            </FormSelect>
                            <FormInput
                                label='Unit/House No. & Street Name' type='text'
                                name='billingAddress1' value={billingAddress1}
                                handleChange={handleChange} required />
                        </FormInputContainer>
                    </CheckoutFormFieldset>
                    <CheckoutFormButtonContainer className={paymentType.toLocaleLowerCase()}>
                        <CheckoutBackButton type="button" isLink={true} onClick={() => {
                            dispatch(updateStep(2));
                        }}><BackArrow>&larr;</BackArrow>Back to Shipping</CheckoutBackButton>
                        <CustomButton type="submit">Place Order</CustomButton>
                    </CheckoutFormButtonContainer>
                </form>
            </CheckoutFormWrapper>
        </CheckoutFormContainer>
    )
};

export default CheckoutForm;