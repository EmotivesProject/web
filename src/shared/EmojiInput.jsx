import React from 'react';
import {
  Button, Input, Modal, Pagination, Icon,
} from 'semantic-ui-react';
import EmojiSelection from './EmojiSelection';
import Emojis from '../constants/Emojis';

const EmojiInput = ({
  buttonText,
  header,
  type,
  action,
  token,
  postID,
  from,
  to,
  subComponentID,
  iconName,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(Emojis.length / 6);

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
            class="center"
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
                action(token, 'emoji', currentInput);
                break;
              case 'comment':
                action(token, currentInput, postID);
                break;
              case 'message':
                action(currentInput, from, to);
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

export default EmojiInput;
