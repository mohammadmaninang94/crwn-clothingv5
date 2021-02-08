import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';

import './App.scss';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path='/' render={() => <HomePage />}/>
        <Route path='/shop' render={() => <ShopPage />} />
      </Switch>
    </div>
  );
}

export default App;
