import React from 'react';
import {
  Button,
  Form,
  Grid,
  Modal,
} from 'semantic-ui-react';

const markerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
  fontSize: '2.5vh',
  left: '5%',
  bottom: '5%',
};

const TempMarker = ({
  createPost,
  info,
  auth,
  setExplore,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(
      auth,
      'map',
      currentInput,
      info.lat,
      info.lng,
      18,
      null,
    );
    setCurrentInput('');
    setOpen(false);
    setExplore(true);
  };

  const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${info.lat},${info.lng}&zoom=18`;
  const mainInformation = (
    <iframe
      title="new-post-window"
      width="100%"
      height="400px"
      loading="lazy"
      src={imageSrc}
    />
  );

  return (
    <div style={markerStyle}>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<button type="button" id="invis-button">🚩</button>}
      >
        <Modal.Header>
          Create new post
        </Modal.Header>
        <Modal.Content>
          <Grid columns={2} divided>
            <Grid.Column>
              {mainInformation}
            </Grid.Column>
            <Grid.Column>
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  id="new-map-explore-post"
                  name="ExplorePost"
                  type="input"
                  size="large"
                  placeholder="New Post"
                  required
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  max="1"
                />
                <Button id="typical-button">Initial Reaction</Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default TempMarker;
