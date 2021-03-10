import React from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

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
            <div className='sign-in'>
                <h2 className='sign-in__title'>I already have an account</h2>
                <p className='sign-in__paragraph'>Sign in with your email and password</p>
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
                    <div className='sign-in__buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' isGoogle onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;