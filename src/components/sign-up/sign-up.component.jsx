import React from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password === confirmPassword) {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);

                await createUserProfileDocument(user, {
                    displayName
                });

                this.setState({
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (error) {
                const errorCode = error.code;
                let errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Email already exists';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'The password is too weak.';
                        break;
                    default:
                        errorMessage = error.message;
                        break;
                }
                alert(errorMessage);
            }
        } else {
            alert("passwords don't match");
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='sign-up__title'>I do not have a account</h2>
                <p className='sign-up__paragraph'>Sign up with your email and password</p>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Display Name'
                        type='text'
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        required />
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
                    <FormInput
                        label='Confrim Password'
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        required />
                    <div className='sign-in__buttons'>
                        <CustomButton type='submit'>Sign up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
};

export default SignUp;