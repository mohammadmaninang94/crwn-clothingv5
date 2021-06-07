import { Fragment } from 'react';

import Spinner from '../spinner/spinner.component';


const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => (
    <Fragment>
        {isLoading ? (
            <Spinner />
        ) : <WrappedComponent {...otherProps} />
        }
    </Fragment>
);


export default WithSpinner;