import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
import PostEmojis from '../feed/PostEmojis';
import EmojiInput from '../shared/EmojiInput';
import getTimeAgoFromObject from '../utils/date';

const markerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
  fontSize: '2.5vh',
  position: 'absolute',
  left: '-10px',
  top: '-20px',
};

const Marker = ({
  data,
  auth,
  likePost,
  unlikePost,
  commentPost,
}) => {
  const [open, setOpen] = React.useState(false);

  const time = getTimeAgoFromObject(data.post.updated_at);

  const likeString = `${data.likes ? data.likes.length : 0} likes `;

  let button = <Button onClick={() => likePost(auth, data.post.id)} icon id="like-button"><Icon name="like" /></Button>;
  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth, data.post.id, likeArray[likeIndex].id)}
        id="unlike-button"
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

  const visitedString = data.post.content.title ? `visited ${data.post.content.title}` : null;
  const reactionString = data.post.content.reaction ? ` - ${data.post.content.reaction}` : null;

  const title = `${data.post.username} ${visitedString} ${reactionString} ${time}`;

  const topReactions = data.emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h2">Top Reactions</Header>
      <PostEmojis key={data.post.id} data={data.emoji_count} />
    </div>
  ) : null;

  const yourReactions = data.self_emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h2">Your Reactions</Header>
      <PostEmojis key={data.post.id} data={data.self_emoji_count} />
    </div>
  ) : null;

  return (
    <div style={markerStyle}>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<button type="button" className="invis-button">{data.post.content.reaction}</button>}
      >
        <Modal.Header>
          <div style={{ display: 'inline' }}>
            {title}
          </div>
          <div className="marker-like-container">
            {likeString}
          </div>
        </Modal.Header>
        <Modal.Content>
          <Grid columns={2} divided>
            <Grid.Column>
              {mainInformation}
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <Grid columns={2} textAlign="center">
                  <Grid.Column>
                    {button}
                  </Grid.Column>
                  <Grid.Column>
                    <EmojiInput
                      header="Add your reaction"
                      type="comment"
                      action={commentPost}
                      auth={auth}
                      postID={data.post.id}
                      subComponentID="emoji-comment-input"
                      iconName="comment"
                    />
                  </Grid.Column>
                </Grid>
              </Grid.Row>
              <br />
              <Grid.Row>
                {topReactions}
                {yourReactions}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Marker;
