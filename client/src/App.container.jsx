import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import pageRoutes from './assests/data/route.data';

import Header from './components/header/header.component';
import CartSidebar from './components/cart-sidebar/cart-sidebar.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { AppWrapper } from './App.styles';

import Spinner from './components/spinner/spinner.component';

const HomePage = lazy(() => import('./pages/home-page/home-page.component'));
const ShopPage = lazy(() => import('./pages/shop-page/shop-page.component'));
const SignInSignUpPage = lazy(() => import('./pages/sign-in-sign-up-page/sign-in-sign-up-page.component'));
const CheckoutPage = lazy(() => import('./pages/checkout-page/checkout-page.component'));
const CartPage = lazy(() => import('./pages/cart-page/cart-page.component'));


const AppContainer = ({ currentUser }) => (
    <AppWrapper>
        <Header />
        <Switch>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />} >
                    <Route exact path={pageRoutes.HOME} render={() => <HomePage />} />
                    <Route path={pageRoutes.SHOP} render={routeProps => <ShopPage {...routeProps} />} />
                    <Route exact path={pageRoutes.CART} render={() => <CartPage />} />
                    <Route exact path={pageRoutes.CHECKOUT} render={({ history }) => currentUser ? <CheckoutPage /> : history.push('/signin')} />
                    <Route path={pageRoutes.SIGN_IN} render={() =>
                        currentUser ? (
                            <Redirect to='/' />
                        ) : (
                            <SignInSignUpPage />
                        )
                    } />
                    <CartSidebar />
                </Suspense>
            </ErrorBoundary>
        </Switch>
    </AppWrapper>
);

export default AppContainer;