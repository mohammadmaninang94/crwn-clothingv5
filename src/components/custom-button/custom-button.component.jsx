import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps }) => (
    <button {...otherProps}>{children}</button>
);

export default CustomButton;