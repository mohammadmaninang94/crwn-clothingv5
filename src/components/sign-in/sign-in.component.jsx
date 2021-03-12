import React from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
    SignInContainer, SignInTitle,
    SignInParagraph, SignInButtonContainer
} from './sign-in.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            alert('Invalid user email and password');
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { email, password } = this.state;
        return (
            <SignInContainer>
                <SignInTitle className='sign-in__title'>I already have an account</SignInTitle>
                <SignInParagraph className='sign-in__paragraph'>Sign in with your email and password</SignInParagraph>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Email'
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        required />
                    <FormInput
                        label='Password'
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        required />
                    <SignInButtonContainer>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' isGoogle onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                    </SignInButtonContainer>
                </form>
            </SignInContainer>
        )
    }
}

export default SignIn;