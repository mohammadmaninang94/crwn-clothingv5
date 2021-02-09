import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='custom-input'>
        <input {...otherProps} onChange={handleChange} className='custom-input__input' />
        {
            label ?
                (<label className={`${otherProps.value.length ? 'custom-input__label--shrink' : ''} custom-input__label`}>{label}</label>) :
                null
        }
    </div>
);

export default FormInput;