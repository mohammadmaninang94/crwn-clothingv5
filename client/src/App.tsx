import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import AppContainer from './App.container';

let stripePromise: any;

const getStripe = () => {
  if (!stripePromise) {
    loadStripe.setLoadParameters({ advancedFraudSignals: false });
    stripePromise = loadStripe('pk_test_51GrdPxGXQEpKYmCgqpBcsxmOHkFPCIIGBaxpXOB5cqDtcwDm3C5GcZFQoIWiA3NgHpyFBTHBPDW0kTCFMQAeCE6a003uQm1GaR');
  }
  return stripePromise;
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <Elements stripe={getStripe()}>
      <AppContainer currentUser={currentUser} />
    </Elements>
  );
};

export default App;
