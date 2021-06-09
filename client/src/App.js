import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import Header from './components/header/header.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { AppContainer } from './App.styles';

const HomePage = lazy(() => import('./pages/home-page/home-page.component'));
const ShopPage = lazy(() => import('./pages/shop-page/shop-page.component'));
const SignInSignUpPage = lazy(() => import('./pages/sign-in-sign-up-page/sign-in-sign-up-page.component'));
const CheckoutPage = lazy(() => import('./pages/checkout-page/checkout-page.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <AppContainer>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>loading</div>}>
            <Route exact path='/' render={() => <HomePage />} />
            <Route path='/shop' render={routeProps => <ShopPage {...routeProps} />} />
            <Route exact path='/checkout' render={({ history }) => currentUser ? <CheckoutPage /> : history.push('/signin')} />
            <Route path='/signin' render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInSignUpPage />
              )
            } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </AppContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
