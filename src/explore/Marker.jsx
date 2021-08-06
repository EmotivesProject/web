import React from 'react';
import {
  Button,
  Form,
  Grid,
  Icon,
  Modal,
} from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';

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
  auth,
  likePost,
  unlikePost,
  commentPost,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    commentPost(auth, currentInput, data.post.id);
    setCurrentInput('');
  };

  const time = getTimeAgoFromObject(data.post.updated_at);

  const title = `${data.post.username} posted ${data.post.content.message} ${time}`;

  const likeString = `${data.likes ? data.likes.length : 0} likes `;

  let button = <Button onClick={() => likePost(auth, data.post.id)} icon id="like-button-marker"><Icon name="like" /></Button>;
  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth, data.post.id, likeArray[likeIndex].id)}
        id="unlike-button-marker"
        icon
      >
        <Icon name="like" />
      </Button>
    );
  }

  let mainInformation = <>Loading</>;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${data.post.content.latitude},${data.post.content.longitude}&zoom=18`;
    mainInformation = (
      <iframe
        title={data.post.id}
        width="100%"
        height="400px"
        loading="lazy"
        src={imageSrc}
      />
    );
  }

  let emojiString = '';
  if (data.comments !== null) {
    for (let i = 0; i < data.comments.length; i += 1) {
      emojiString += data.comments[i].message;
    }
  }

  return (
    <div style={markerStyle}>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<button type="button" id="invis-button">{data.post.content.message}</button>}
      >
        <Modal.Header>
          <div style={{ display: 'inline' }}>
            {title}
          </div>
          <div id="marker-like-container">
            {likeString}
            {button}
          </div>
        </Modal.Header>
        <Modal.Content>
          <Grid columns={2} divided>
            <Grid.Column>
              {mainInformation}
            </Grid.Column>
            <Grid.Column>
              {emojiString}
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  id="marker-comment"
                  name="React"
                  type="input"
                  size="large"
                  placeholder="New Reaction!"
                  required
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  max="4"
                />
                <Button id="typical-button">Comment</Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Marker;
