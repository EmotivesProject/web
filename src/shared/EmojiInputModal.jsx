import React from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

const EmojiInputModal = ({
  action, token, header, postID,
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
            action(token, currentInput, postID);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EmojiInputModal;
