import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import FeedPage from './feed/FeedPage';
import MessengerPage from './messenger/MessengerPage';
import LogInPage from './logIn/LogInPage';
import RegisterPage from './register/RegisterPage';
import IndividualPostPage from './feed/IndividualPostPage';
import autologin from './autologin/autologin';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/messenger" component={MessengerPage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/post/:id" component={IndividualPostPage} />
        <Route path="/createautologin/" component={autologin} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
