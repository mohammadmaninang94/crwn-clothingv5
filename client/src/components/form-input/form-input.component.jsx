import { CustomInputContainer, CustomLabel, CustomInput } from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <CustomInputContainer>
        <CustomInput {...otherProps} onChange={handleChange} />
        {
            label ?
                (<CustomLabel hasValue={!!otherProps.value.length}>{label}</CustomLabel>) :
                null
        }
    </CustomInputContainer>
);

export default FormInput;