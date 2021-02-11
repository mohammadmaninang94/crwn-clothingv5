import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import SignInSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import './App.scss';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const { userSnapshot } = await createUserProfileDocument(userAuth);

        if (userSnapshot.exists) {
          const userObject = userSnapshot.data();

          this.setState({
            currentUser: {
              id: userSnapshot.id,
              ...userObject
            }
          })
        }

      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="container">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' render={() => <HomePage />} />
          <Route path='/shop' render={() => <ShopPage />} />
          <Route path='/signin' render={() => <SignInSignUpPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
