import './custom-button.styles.scss';

const CustomButton = ({ children, additionalClass, ...otherProps }) => (
    <button className={`btn ${additionalClass ? additionalClass: ''}`} {...otherProps}>{children}</button>
);

export default CustomButton;