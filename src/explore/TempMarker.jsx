import React from 'react';
import {
  Grid,
  Input,
  Modal,
} from 'semantic-ui-react';
import EmojiInput from '../shared/EmojiInput';

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
              <label htmlFor="new-map-explore-post">
                What is it?
                <br />
                <Input
                  id="new-map-explore-post"
                  name="ExplorePost"
                  type="input"
                  size="large"
                  placeholder="Place"
                  required
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  max="1"
                />
              </label>
              <br />
              <br />
              <label htmlFor="typical-button">
                What is your reaction?
                <br />
                <EmojiInput
                  key="brand-new-temp-marker-create"
                  header="Initial Reaction?"
                  type="map"
                  action={createPost}
                  auth={auth}
                  subComponentID="emoji-comment-input"
                  iconName="comment"
                  title={currentInput}
                  info={info}
                  openState={setOpen}
                  setTitle={setCurrentInput}
                  setExplore={setExplore}
                />
              </label>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default TempMarker;
