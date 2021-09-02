import React from 'react';
import {
  Button, Input, Modal, Pagination, Icon,
} from 'semantic-ui-react';
import EmojiSelection from './EmojiSelection';
import Emojis from '../constants/Emojis';

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
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Number of emoji panels
  const totalPages = Math.ceil(Emojis.length / 6);

  // Basic functions that help the modal
  const updateCurrentInput = (str) => {
    setCurrentInput(currentInput.concat(str));
  };

  const handlePageUpdate = (unused, obj) => {
    const { activePage } = obj;
    setPage(activePage);
  };

  const iconButton = iconName ? <Icon name={iconName} /> : null;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button icon className={subComponentID.concat('-button')} aria-label="create emoji content">
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
            id="emoji-input"
            fluid
          />
        </label>
        <br />
        <EmojiSelection page={page} action={updateCurrentInput} />
        <br />
        <div className="ui center aligned container">
          <Pagination
            id="pagination"
            className="center"
            activePage={page}
            onPageChange={handlePageUpdate}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          className="emoji-selection-button"
          icon
          labelPosition="left"
          onClick={() => setCurrentInput(currentInput.slice(0, -2))}
          negative
        >
          <Icon name="cancel" />
          Delete Last Emoji
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
