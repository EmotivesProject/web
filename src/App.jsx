import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import FeedPage from './feed/FeedPage';
import MessengerPage from './messenger/MessengerPage';
import LogInPage from './logIn/LogInPage';
import RegisterPage from './register/RegisterPage';
import IndividualPostPage from './feed/IndividualPostPage';
import Autologin from './autologin/Autologin';
import NotificationPage from './notifications/NotificationPage';
import ExplorePage from './explore/ExplorePage';
import LogOutPage from './logout/LogOutPage';

function App() {
  return (
    <>
      <div role="navigation">
        <a className="skip-to-content-link" href="#main">
          Skip to content
        </a>
      </div>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/messenger" component={MessengerPage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/notifications" component={NotificationPage} />
        <Route path="/post/:id" component={IndividualPostPage} />
        <Route path="/createautologin/" component={Autologin} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/log_out" component={LogOutPage} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
