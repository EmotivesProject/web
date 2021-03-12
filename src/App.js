import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './component/Home.js'
import SignUp from './component/SignUp.js'
import LogIn from './component/LogIn.js'
import Error from './component/Error.js'

function App() {
  return (
        <main>
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/sign_up' component={SignUp} />
                <Route path='/log_in' component={LogIn} />
				<Route component={Error} />
            </Switch>
        </main>
  );
}

export default App;
