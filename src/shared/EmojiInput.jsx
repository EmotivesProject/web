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
  initialOpen,
  allowKeyboard,
  setNewPost,
}) => {
  const [open, setOpen] = React.useState(initialOpen);
  const [currentInput, setCurrentInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // Basic functions that help the modal
  const updateCurrentInput = (str) => {
    setCurrentInput(currentInput.concat(str));
    setErrorMessage('');
  };

  const updateCurrentInputViaKeyboard = (e) => {
    const str = e.target.value;
    if (allowKeyboard) {
      setCurrentInput(str);
      setErrorMessage('');
    } else {
      setErrorMessage('Can only use emojis here');
    }
  };

  const handleSubmit = () => {
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
        setNewPost(null);
        break;
      default:
    }
    setCurrentInput('');
    setOpen(false);
  };

  const handleKeypress = (e) => {
    // Key Code 13 is enter
    if (e.keyCode === 13) {
      handleSubmit();
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
            placeholder={`Your ${type}`}
            value={currentInput}
            onKeyDown={(e) => handleKeypress(e)}
            onChange={(e) => updateCurrentInputViaKeyboard(e)}
            id="emoji-input"
            className="xx-large"
            fluid
          />
          {errorMes}
        </label>
        <EmojiSelection action={updateCurrentInput} initialInput="" />
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

export default EmojiInput;
