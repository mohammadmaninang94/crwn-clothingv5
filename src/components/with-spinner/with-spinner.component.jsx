import { Fragment } from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';


const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => (
    <Fragment>
        {isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : <WrappedComponent {...otherProps}/>
        }
    </Fragment>
);


export default WithSpinner;