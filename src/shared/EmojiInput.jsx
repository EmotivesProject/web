import React from 'react';
import {
  Button, Input, Modal, Icon, Message,
} from 'semantic-ui-react';
import EmojiSelection from './EmojiSelection';

// Overly complex emoji Input that can action a lot of different things
const EmojiInput = ({
  buttonText,
  header,
  type,
  action,
  auth,
  postID,
  from,
  to,
  subComponentID,
  iconName,
  title,
  info,
  openState,
  setTitle,
  setExplore,
  initialOpen,
  allowKeyboard,
}) => {
  const [open, setOpen] = React.useState(initialOpen);
  const [currentInput, setCurrentInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // Basic functions that help the modal
  const updateCurrentInput = (str) => {
    setCurrentInput(currentInput.concat(str));
  };

  const updateCurrentInputViaKeyboard = (str) => {
    if (allowKeyboard) {
      setCurrentInput(currentInput.concat(str));
      setErrorMessage('');
    } else {
      setErrorMessage('Can only use emojis here');
    }
  };

  const iconButton = iconName ? <Icon name={iconName} /> : null;

  const errorMes = errorMessage !== '' ? <Message color="red" style={{ fontSize: '2.5vh' }}>{errorMessage}</Message> : null;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button title={type} icon tabIndex="0" className={subComponentID.concat('-button')} aria-label="create emoji content">
          {iconButton}
          &nbsp;
          {buttonText}
        </Button>
      )}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <label htmlFor="emoji-input" id="emoji-input-label">
          Your&nbsp;
          {type}
          <Input
            placeholder="Waiting for input..."
            value={currentInput}
            onChange={(e) => updateCurrentInputViaKeyboard(e.target.value)}
            id="emoji-input"
            fluid
          />
          {errorMes}
        </label>
        <EmojiSelection action={updateCurrentInput} />
      </Modal.Content>
      <Modal.Actions style={{ display: 'flex', float: 'right' }}>
        <Button
          className="emoji-selection-button"
          icon
          labelPosition="left"
          onClick={() => setCurrentInput('')}
          negative
        >
          <Icon name="cancel" />
          Delete Emoji Input
        </Button>
        <Button
          className="emoji-selection-button"
          onClick={() => {
            setOpen(false);
            setCurrentInput('');
          }}
        >
          Cancel Create
        </Button>
        <Button
          id="emoji-selection-creation-button"
          content="Finished!"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            switch (type) {
              case 'post':
                action(auth, 'emoji', currentInput);
                break;
              case 'comment':
                action(auth, currentInput, postID);
                break;
              case 'message':
                action(currentInput, from, to);
                break;
              case 'map':
                action(auth, 'map', currentInput, info.lat, info.lng, title);
                openState(false);
                setTitle('');
                setExplore(true);
                break;
              default:
            }
            setCurrentInput('');
            setOpen(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EmojiInput;
