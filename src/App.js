import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js'
import SignUp from './pages/SignUp.js'
import LogIn from './pages/LogIn.js'
import Error from './pages/Error.js'

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
