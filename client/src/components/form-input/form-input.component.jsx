import { Fragment } from 'react';
import {
    CustomInputContainer, CustomLabel, CustomInput,
    CustomRadioLabel, CustomRadioSpan
} from './form-input.styles';

const FormInput = ({ handleChange, label, type, ...otherProps }) => {
    const hasValue = otherProps.value ? true : false;
    return (
        <CustomInputContainer>
            {type === 'radio' ?
                <Fragment>
                    <CustomRadioLabel>
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
                            (<CustomLabel hasValue={hasValue}>{label}</CustomLabel>) :
                            null
                    }
                </Fragment>
            }
        </CustomInputContainer>
    )
};

export default FormInput;