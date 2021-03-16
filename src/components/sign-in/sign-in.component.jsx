import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { selectUserSignInMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
    SignInContainer, SignInTitle,
    SignInParagraph, SignInButtonContainer
} from './sign-in.styles';

const SignIn = ({ errorMessage, emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle className='sign-in__title'>I already have an account</SignInTitle>
            <SignInParagraph className='sign-in__paragraph'>Sign in with your email and password</SignInParagraph>
            <form onSubmit={handleSubmit}>
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
                <SignInButtonContainer>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' isGoogle onClick={googleSignInStart}>Sign in with Google</CustomButton>
                </SignInButtonContainer>
                <p>{errorMessage}</p>
            </form>
        </SignInContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectUserSignInMessage
});

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);