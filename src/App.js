import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import SignInSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import './App.scss';

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path='/' render={() => <HomePage />} />
        <Route path='/shop' render={() => <ShopPage />} />
        <Route path='/signin' render={() => <SignInSignUpPage />} />
      </Switch>
    </div>
  );
}

export default App;
