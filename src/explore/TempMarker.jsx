import GoogleMapReact from 'google-map-react';
import React from 'react';
import {
  Grid,
  Modal,
} from 'semantic-ui-react';
import EmojiInput from '../shared/EmojiInput';

const markerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
  fontSize: '2.5vh',
  position: 'absolute',
  left: '-10px',
  top: '-20px',
};

const defaultZoom = 16;

const TempMarker = ({
  createPost,
  info,
  auth,
  setModalOpen,
  modalState,
  setNewPost,
}) => {
  const initialCentre = {
    lat: info.lat,
    lng: info.lng,
  };

  const mainInformation = (
    <div className="post-map" style={{ position: 'relative', width: '100%', height: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={initialCentre}
        defaultZoom={defaultZoom}
      >
        <div
          lat={info.lat}
          lng={info.lng}
          style={{ fontSize: 'xx-large' }}
        >
          🚩
        </div>
      </GoogleMapReact>
    </div>
  );

  return (
    <div style={markerStyle}>
      <Modal
        closeIcon
        onClose={() => {
          setModalOpen(false);
        }}
        onOpen={() => {
          setModalOpen(true);
        }}
        open={modalState}
        trigger={<button type="button" className="invis-button">🚩</button>}
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
                  info={info}
                  openState={setModalOpen}
                  setNewPost={setNewPost}
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
