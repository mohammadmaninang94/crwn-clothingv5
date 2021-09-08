import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchShippingFeeStart, updateShippingDetails, updateCheckoutStep } from '../../redux/checkout/checkout.actions';
import { selectShippingDetails } from '../../redux/checkout/checkout.selectors';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import CustomButton from './../custom-button/custom-button.component';

import { GetDropdownData, GetDropdownDataByCode } from './checkout-form.utils';

import {
    CheckoutFormFieldset, CheckoutFormLegend,
    CustomInputWrapper, FormInputContainer,
    CheckoutFormButtonContainer, CheckoutBackButton, BackArrow
} from './checkout-form.styles';

const ShippingForm = ({ step }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const reduxShippingDetails = useSelector(selectShippingDetails);

    const [shippingDetails, setShippingDetails] = useState(reduxShippingDetails);

    const [dropdownAddress, setDropdownAddress] = useState({
        regions: [], provinces: [],
        cityAndMun: [], barangays: [],
        zipCodes: []
    });

    const { firstName, lastName, mobileNo, emailAddress,
        address1, cityMun, province, barangay,
        region, zipCode } = shippingDetails;

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateShippingDetails(shippingDetails));
        if (reduxShippingDetails.zipCode !== zipCode ||
            reduxShippingDetails.barangay !== barangay ||
            reduxShippingDetails.cityMun !== cityMun ||
            reduxShippingDetails.province !== province ||
            reduxShippingDetails.region !== region) {
            dispatch(fetchShippingFeeStart());
        }else{
            dispatch(updateCheckoutStep(3));
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setShippingDetails({ ...shippingDetails, [name]: value });

        if (event.target.type === 'select-one') {
            const selectedndex = event.target.selectedIndex;
            const code = event.target[selectedndex].getAttribute('data-code');
            if (code) {
                const dropdownObj = GetDropdownDataByCode(name, code);
                setDropdownAddress({ ...dropdownAddress, ...dropdownObj });
            }
        }
    }

    useEffect(() => {
        const populatedDropdowns = () => {
            const dropdownObj = GetDropdownData(region, province, cityMun, barangay);
            setDropdownAddress({ ...dropdownAddress, ...dropdownObj });
        };

        populatedDropdowns();
        // eslint-disable-next-line
    }, []);

    return (
        <form onSubmit={handleSubmit} className={step === 2 ? 'show' : 'hide'}>
            <CheckoutFormFieldset className='show'>
                <CheckoutFormLegend>Shipping address</CheckoutFormLegend>
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
                            {dropdownAddress.regions.map(({ name, reg_code }) =>
                            (
                                <option key={`shipping-${reg_code}`} value={name}
                                    data-code={reg_code}>{name}</option>
                            ))}
                        </FormSelect>
                        <FormSelect name='province' value={province}
                            handleChange={handleChange} required>
                            <option value=''>Province</option>
                            {dropdownAddress.provinces ?
                                dropdownAddress.provinces.map(({ name, prov_code }) => (
                                    <option key={`shipping-${prov_code}`} value={name}
                                        data-code={prov_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <CustomInputWrapper>
                        <FormSelect name='cityMun' value={cityMun}
                            handleChange={handleChange} required>
                            <option value=''>City or Municipality</option>
                            {dropdownAddress.cityAndMun ?
                                dropdownAddress.cityAndMun.map(({ name, mun_code }) => (
                                    <option key={`shipping-${mun_code}`} value={name}
                                        data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                        <FormSelect name='barangay' value={barangay}
                            handleChange={handleChange} required>
                            <option value=''>Barangay</option>
                            {dropdownAddress.barangays ?
                                dropdownAddress.barangays.map(({ name, mun_code }) => (
                                    <option key={`shipping-${name}`} value={name}
                                        data-code={mun_code}>{name}</option>
                                )) : null}
                        </FormSelect>
                    </CustomInputWrapper>
                    <FormSelect name='zipCode' value={zipCode}
                        handleChange={handleChange} required>
                        <option value=''>Zip Code</option>
                        {dropdownAddress.zipCodes ?
                            dropdownAddress.zipCodes.map(code => (
                                <option key={`shipping-${code}`} value={code}>{code}</option>
                            )) : null}
                    </FormSelect>
                    <FormInput
                        label='Unit/House No. & Street Name' type='text'
                        name='address1' value={address1}
                        handleChange={handleChange} required />
                </FormInputContainer>
                <CheckoutFormButtonContainer>
                    <CheckoutBackButton type="button" isLink={true} onClick={() => {
                        history.push('/cart');
                        dispatch(updateShippingDetails(shippingDetails));
                    }}><BackArrow>&larr;</BackArrow>Back to Cart</CheckoutBackButton>
                    <CustomButton type="submit">Continue to payment</CustomButton>
                </CheckoutFormButtonContainer>
            </CheckoutFormFieldset>
        </form>
    )
};

export default ShippingForm;