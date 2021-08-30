import { FormSelectContainer, CustomFormSelect, CustomFormLabel } from './form-select.styles';

const FormSelect = ({ handleChange, label, children, ...otherProps }) => (
    <FormSelectContainer>
        <CustomFormSelect {...otherProps} onChange={handleChange}>
            {children}
        </CustomFormSelect>
        {
            label ?
                (<CustomFormLabel>{label}</CustomFormLabel>) :
                null
        }
    </FormSelectContainer>
);

export default FormSelect;