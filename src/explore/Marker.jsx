import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

const markerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
  fontSize: '2.5vh',
  left: '5%',
  bottom: '5%',
};

const Marker = ({
  data,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={markerStyle}>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<button type="button" id="invis-button">{data.post.content.message}</button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              Weve found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Marker;
