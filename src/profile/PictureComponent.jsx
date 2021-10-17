import axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  Grid, Image, Message, Segment,
} from 'semantic-ui-react';
import createProfileLink from '../utils/createProfileLink';
import { extractErrorObject } from '../utils/extractObjects';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_MEDIA_UPLOAD_BASE_URL;

export const PictureComponent = ({ auth }) => {
  const [error, setError] = React.useState(null);
  const [newFile, SetNewFile] = React.useState([]);

  const errorMessage = error !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        {error}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

  const fileChange = (event) => {
    SetNewFile(event.target.files[0]);
  };

  const onFormSubmit = () => {
    const url = `${host}://${base}/user_profile`;
    const formData = new FormData();
    formData.append('image', newFile);
    axios.post(
      url,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      },
    ).then(() => {
      setError(null);
      window.location.reload(false);
    }).catch((err) => {
      setError(extractErrorObject(err).message);
    });
  };

  return (
    <Segment>
      {errorMessage}
      <h2>
        Profile Picture
      </h2>
      <Grid columns={2} textAlign="center">
        <Grid.Column>
          <h3>Current</h3>
          <Image
            src={createProfileLink(auth.username)}
            size="medium"
            className="profile-display"
          />
        </Grid.Column>
        <Grid.Column>
          <h3>New</h3>
          <Form onSubmit={onFormSubmit} className="profile-upload-form">
            <Form.Field>
              <Button as="label" htmlFor="file" type="button" className="profile-upload-button">
                Select a new profile picture
              </Button>
              <input type="file" id="file" hidden onChange={fileChange} />
            </Form.Field>
            <Button type="submit" positive>Confirm</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default PictureComponent;
