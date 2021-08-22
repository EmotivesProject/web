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
        <Button icon id={subComponentID.concat('-button')}>
          {iconButton}
          &nbsp;
          {buttonText}
        </Button>
      )}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Input
          id="emoji-input"
          placeholder="Waiting for input..."
          value={currentInput}
          fluid
        />
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
          id="emoji-selection-button"
          icon
          labelPosition="left"
          onClick={() => setCurrentInput(currentInput.slice(0, -2))}
          negative
        >
          <Icon name="cancel" />
          Delete Last Emoji
        </Button>
        <Button
          id="emoji-selection-button"
          onClick={() => {
            setOpen(false);
            setCurrentInput('');
          }}
        >
          Cancel Create
        </Button>
        <Button
          id="emoji-selection-button"
          content="Create it!"
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
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EmojiInput;
