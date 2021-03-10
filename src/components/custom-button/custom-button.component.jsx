import { ButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, additionalClass, ...otherProps }) => (
    <ButtonContainer {...otherProps}>{children}</ButtonContainer>
);

export default CustomButton;