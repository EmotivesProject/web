import React from 'react';
import {
  Button, Input, Modal, Pagination,
} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import EmojiSelection from './EmojiSelection';
import Emojis from '../constants/Emojis';

const UniversalInput = ({
  buttonText,
  header,
  type,
  action,
  token,
  postID,
  from,
  to,
}) => {
  const initialCentre = {
    lat: -27.47,
    lng: 153.03,
  };
  const defaultZoom = 15;

  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');
  const [currentZoom, setCurrentZoom] = React.useState(defaultZoom);
  const [currentPosition, setCurrentCenter] = React.useState(initialCentre);
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(Emojis.length / 6);

  const boundsChange = (obj) => {
    const { center, zoom } = obj;
    setCurrentZoom(zoom);
    setCurrentCenter(center);
  };

  const updateCurrentInput = (str) => {
    setCurrentInput(currentInput.concat(str));
  };

  const handlePageUpdate = (unused, obj) => {
    const { activePage } = obj;
    setPage(activePage);
  };

  const input = type !== 'map' ? (
    <>
      <Input
        placeholder="Waiting for input..."
        value={currentInput}
      />
      <br />
      <EmojiSelection page={page} action={updateCurrentInput} />
      <Pagination
        activePage={page}
        onPageChange={handlePageUpdate}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
      />
    </>
  ) : (
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
  );

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>{buttonText}</Button>}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {input}
      </Modal.Content>
      <Modal.Actions>
        {type !== 'map'
          ? (
            <Button
              content="Remove Last Emoji"
              onClick={() => setCurrentInput(currentInput.slice(0, -2))}
              positive
            />
          )
          : null }
        <Button onClick={() => {
          setOpen(false);
          setCurrentInput('');
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
              case 'post':
                action(token, 'emoji', currentInput);
                break;
              case 'comment':
                action(token, currentInput, postID);
                break;
              case 'message':
                action(currentInput, from, to);
                break;
              case 'map':
                action(
                  token,
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

export default UniversalInput;
