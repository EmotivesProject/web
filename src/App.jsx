import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Register';
import Error from './pages/Error';
import LogIn from './pages/LogIn';
import Messenger from './pages/Messenger';
import './site.css';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/messenger" component={Messenger} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
