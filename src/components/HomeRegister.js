import {Button, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function HomeRegister() {
	function activateLasers() {
		console.log("YE");
	}

  return (
	  <div>
      <Header as='h2' textAlign='center'>
        New to the site?
      </Header>
	  <Link to="/register">
      <Button positive onClick={activateLasers}>
            Register now
      </Button>
	  </Link>
	  </div>
  );
}

export default HomeRegister;
