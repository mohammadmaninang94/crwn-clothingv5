import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import AppContainer from './App.container';

const stripePromise = loadStripe('pk_test_51GrdPxGXQEpKYmCgqpBcsxmOHkFPCIIGBaxpXOB5cqDtcwDm3C5GcZFQoIWiA3NgHpyFBTHBPDW0kTCFMQAeCE6a003uQm1GaR');

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <Elements stripe={stripePromise}>
      <AppContainer currentUser={currentUser} />
    </Elements>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
