import { Fragment } from 'react';
import {
    CustomInputContainer, CustomLabel, CustomInput,
    CustomRadioLabel, CustomRadioSpan
} from './form-input.styles';

const FormInput = ({ handleChange, label, type, ...otherProps }) => (
    <CustomInputContainer>
        {type === 'radio' ?
            <Fragment>
                <CustomRadioLabel hasValue={!!otherProps.value.length}>
                    <CustomInput {...otherProps} type={type} onChange={handleChange} />
                    <CustomRadioSpan />
                    {label}
                </CustomRadioLabel>
            </Fragment>
            :
            <Fragment>
                <CustomInput {...otherProps} type={type} onChange={handleChange} />
                {
                    label ?
                        (<CustomLabel hasValue={!!otherProps.value.length}>{label}</CustomLabel>) :
                        null
                }
            </Fragment>
        }
    </CustomInputContainer>
);

export default FormInput;