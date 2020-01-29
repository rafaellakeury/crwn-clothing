import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header.js';
import SignInSignUpPage from './components/sign-in-sign-up/SignInSignUpPage';
import { auth } from './firebase/FirebaseUtils';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth =  auth.onAuthStateChanged( user => {
      this.setState({currentUser: user});

      console.log(user);
    });
  }

  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
