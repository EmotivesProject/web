import React from 'react';
import {
  Button,
  Grid, Segment,
} from 'semantic-ui-react';
import randomKey from '../utils/randomKey';

export const LogoutComponent = ({ removeAuth }) => {
  const handleLogOutClick = () => {
    removeAuth();
    window.location.reload();
  };

  return (
    <Segment>
      <h2>
        Log out
      </h2>
      <Grid columns={3} textAlign="center">
        <Grid.Column />
        <Grid.Column>
          <Button
            key={randomKey()}
            onClick={() => handleLogOutClick()}
            className="profile-logout"
            icon="sign-out alternate"
          />
        </Grid.Column>
        <Grid.Column />
      </Grid>
    </Segment>
  );
};

export default LogoutComponent;
