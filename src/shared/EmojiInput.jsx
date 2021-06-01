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

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button icon id={subComponentID.concat('-button')}>
          <Icon name="smile outline" />
          &nbsp;
          {buttonText}
        </Button>
      )}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
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
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Remove Last Emoji"
          onClick={() => setCurrentInput(currentInput.slice(0, -2))}
          positive
        />
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
