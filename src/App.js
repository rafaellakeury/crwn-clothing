import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header.js';
import SignInSignUpPage from './components/sign-in-sign-up/SignInSignUpPage';
import { auth, createUserProfileDocument } from './firebase/FirebaseUtils';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth =  auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState (
          {
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });     
        });

      }
      this.setState({currentUser: userAuth});
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
