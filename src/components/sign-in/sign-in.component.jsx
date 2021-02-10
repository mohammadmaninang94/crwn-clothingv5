import React from 'react';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import FromInput from '../form-input/form-input.component';
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

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ email: '', password: '' });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { email, password } = this.state;
        return (
            <form className='sign-in' onSubmit={this.handleSubmit}>
                <FromInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    handleChange={this.handleChange}
                    required />
                <FromInput
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    handleChange={this.handleChange}
                    required />
                <div className='sign-in__buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' additionalClass='btn--google' onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                </div>
            </form>
        )
    }
}

export default SignIn;