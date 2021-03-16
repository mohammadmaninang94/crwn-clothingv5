import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signUpStart } from '../../redux/user/user.actions';
import { selectUserSignUpMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignUpContainer, SignUpTitle, SignUpParagraph } from './sign-up.styles';

const SignUp = ({ signUp, errorMessage }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password === confirmPassword) {
            signUp({ displayName, email, password });
        } else {
            alert("passwords don't match");
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have a account</SignUpTitle>
            <SignUpParagraph>Sign up with your email and password</SignUpParagraph>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    name='displayName'
                    value={displayName}
                    handleChange={handleChange}
                    required />
                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                    required />
                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    handleChange={handleChange}
                    required />
                <FormInput
                    label='Confrim Password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    handleChange={handleChange}
                    required />
                <div className='sign-in__buttons'>
                    <CustomButton type='submit'>Sign up</CustomButton>
                </div>
                <p>{errorMessage}</p>
            </form>
        </SignUpContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    errorMessage: selectUserSignUpMessage
});

const mapDispatchToProps = dispatch => ({
    signUp: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);