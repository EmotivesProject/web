import React from 'react';
import {
  Button, Modal, Icon,
} from 'semantic-ui-react';
import Hexgrid from './Hexgrid';

// Overly complex emoji Input that can action a lot of different things
const SuggestInput = ({
  header,
  type,
  action,
  auth,
  subComponentID,
  iconName,
  title,
  info,
  openState,
  setNewPost,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');

  const handleSubmit = () => {
    switch (type) {
      case 'map':
        action(auth, 'map-suggest', currentInput, info.lat, info.lng, title);
        openState(false);
        setNewPost(null);
        break;
      default:
    }
    setCurrentInput('');
    setOpen(false);
  };

  const iconButton = iconName ? <Icon name={iconName} /> : null;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button title={type} icon tabIndex="0" className={subComponentID.concat('-button')} aria-label="create emoji content">
          {iconButton}
        </Button>
      )}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Hexgrid
          setCurrentInput={setCurrentInput}
        />
      </Modal.Content>
      <Modal.Actions style={{ display: 'flex', float: 'right', fontSize: 'large' }}>
        <Button
          className="large"
          icon
          labelPosition="left"
          onClick={() => setCurrentInput('')}
          negative
        >
          <Icon name="cancel" />
          Delete Input
        </Button>
        <Button
          className="large"
          onClick={() => {
            setOpen(false);
            setCurrentInput('');
          }}
        >
          Cancel
        </Button>
        <Button
          className="typical-button large"
          content="Finished!"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleSubmit()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default SuggestInput;
