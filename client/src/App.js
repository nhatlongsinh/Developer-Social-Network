import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/NotFound';
import store from './redux/store';
import history from './ultils/history';
import { setAuthToken } from './ultils/privateApi';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { isTokenExist, getLocalToken } from './ultils/localStorage';
import PrivateRoute from './ultils/PrivateRoute';
import AuthRoute from './ultils/AuthRoute';
import './ultils/networkService';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import './App.css';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// check for token
if (isTokenExist()) {
  const token = getLocalToken();
  // decode
  const decoded = jwtDecode(token);

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  } else {
    // set token
    setAuthToken(token);
    store.dispatch(setCurrentUser(decoded));
  }
}

function NonLandingPages() {
  return (
    <div className="container">
      <Switch>
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={CreateProfile} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute path="/add-experience" component={AddExperience} />
        <PrivateRoute path="/add-education" component={AddEducation} />
        <PrivateRoute path="/feed" component={Posts} />
        <PrivateRoute path="/post/:id" component={Post} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/profile/:handle" component={Profile} />
        <Route path="/profile-id/:id" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        <Switch>
          <AuthRoute exact path="/" component={Landing} />
          <Route component={NonLandingPages} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}
export default App;
