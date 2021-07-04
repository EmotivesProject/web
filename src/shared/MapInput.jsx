import React from 'react';
import {
  Button, Modal, Icon,
} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const MapInput = ({
  buttonText,
  header,
  type,
  action,
  auth,
  subComponentID,
}) => {
  const initialCentre = {
    lat: -27.47,
    lng: 153.03,
  };
  const defaultZoom = 15;

  const [open, setOpen] = React.useState(false);
  const [currentZoom, setCurrentZoom] = React.useState(defaultZoom);
  const [currentPosition, setCurrentCenter] = React.useState(initialCentre);

  const boundsChange = (obj) => {
    const { center, zoom } = obj;
    setCurrentZoom(zoom);
    setCurrentCenter(center);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button icon id={subComponentID.concat('-button')}>
          <Icon name="map" />
          &nbsp;
          {buttonText}
        </Button>
      )}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={initialCentre}
            defaultZoom={defaultZoom}
            yesIWantToUseGoogleMapApiInternals
            onChange={boundsChange}
            options={(map) => ({ mapTypeId: map.MapTypeId.SATELLITE })}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => {
          setOpen(false);
        }}
        >
          Nope
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            switch (type) {
              case 'map':
                action(
                  auth,
                  'map',
                  'map post',
                  currentPosition.lat,
                  currentPosition.lng,
                  currentZoom,
                );
                break;
              default:
            }
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default MapInput;
