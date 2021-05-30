import React from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

const EmojiInputModal = ({
  header,
  type,
  action,
  token,
  postID,
  from,
  to,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Input
          placeholder="Waiting for input..."
          value={currentInput}
        />
        <Button
          content="Post it!"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setCurrentInput(currentInput.concat('👍'))}
          positive
        />
        <Button
          content="Remove Last Emoji"
          onClick={() => setCurrentInput(currentInput.slice(0, -2))}
          positive
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => {
          setOpen(false);
          setCurrentInput('');
        }}
        >
          Nope
        </Button>
        <Button
          content="Post it!"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            switch (type) {
              case 'post':
                action(token, currentInput);
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

export default EmojiInputModal;
