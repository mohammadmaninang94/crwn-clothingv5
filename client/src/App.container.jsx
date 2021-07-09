import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import CartSidebar from './components/cart-sidebar/cart-sidebar.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { AppWrapper } from './App.styles';

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
                <Suspense fallback={<div>loading</div>}>
                    <Route exact path='/' render={() => <HomePage />} />
                    <Route path='/shop' render={routeProps => <ShopPage {...routeProps} />} />
                    <Route exact path='/cart' render={() => <CartPage />} />
                    <Route exact path='/checkout' render={({ history }) => currentUser ? <CheckoutPage /> : history.push('/signin')} />
                    <Route path='/signin' render={() =>
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