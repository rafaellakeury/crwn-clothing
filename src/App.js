import React from 'react';
import './App.css';
import { Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header.js';
import SignInSignUpPage from './components/sign-in-sign-up/SignInSignUpPage';
import { auth, createUserProfileDocument } from './firebase/FirebaseUtils';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth =  auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser(
          {
            id: snapshot.id,
            ...snapshot.data()
          });
        });

      }
      setCurrentUser(userAuth);
    });
  }

  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signIn' 
            render={() =>
             this.props.currentUser ? (
              <Redirect to='/' />
              ) : (
              <SignInSignUpPage />
              )
              }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
