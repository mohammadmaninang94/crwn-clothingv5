import './sign-in-sign-up-page.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInSignUpPage = () => (
    <div className='sign-in-sign-up'>
        <SignIn />
        <SignUp />
    </div>
);

export default SignInSignUpPage;