import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import PostComments from '../feed/PostComments';
import EmojiInput from '../shared/EmojiInput';
import Avatar from '../shared/Avatar';
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

const defaultZoom = 16;

const Marker = ({
  data,
  auth,
  likePost,
  unlikePost,
  commentPost,
  setViewingPost,
}) => {
  const [open, setOpen] = React.useState(false);

  const time = getTimeAgoFromObject(data.post.updated_at);

  const likeString = `${data.likes ? data.likes.length : 0} likes `;

  let button = (
    <Button
      onClick={() => likePost(auth, data.post.id)}
      className="like-button"
      icon
      aria-label="like post"
      title="Like the post"
      tabIndex="0"
      content={<Icon name="thumbs up" />}
    />
  );

  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth, data.post.id, likeArray[likeIndex].id)}
        className="unlike-button"
        aria-label="unlike post"
        title="Unlike the post"
        tabIndex="0"
        icon
        content={<Icon name="thumbs up" />}
      />
    );
  }

  let mainInformation = <>Loading</>;
  let buttonMarker = null;

  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else if (data.post.content.type === 'map-suggest') {
    const initialCentre = {
      lat: data.post.content.latitude,
      lng: data.post.content.longitude,
    };

    buttonMarker = (
      <button type="button" className="invis-button">
        <img
          src={data.post.content.reaction}
          alt="reaction"
          style={{ width: '50px', height: '50px' }}
        />
      </button>
    );

    mainInformation = (
      <div className="post-map" style={{ position: 'relative', width: '100%', height: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={initialCentre}
          defaultZoom={defaultZoom}
        >
          <div
            lat={content.latitude}
            lng={content.longitude}
            style={markerStyle}
          >
            <img
              src={data.post.content.reaction}
              alt="reaction"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        </GoogleMapReact>
      </div>
    );
  } else {
    const initialCentre = {
      lat: data.post.content.latitude,
      lng: data.post.content.longitude,
    };

    buttonMarker = <button type="button" className="invis-button">{data.post.content.reaction}</button>;

    mainInformation = (
      <div className="post-map" style={{ position: 'relative', width: '100%', height: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={initialCentre}
          defaultZoom={defaultZoom}
        >
          <div
            lat={content.latitude}
            lng={content.longitude}
            style={markerStyle}
          >
            {content.reaction}
          </div>
        </GoogleMapReact>
      </div>
    );
  }

  const title = `${data.post.username}`;

  const subTitle = `${likeString} ${time}`;

  const comments = data.comments.length !== 0 || data.likes.length !== 0 ? (
    <div id="reaction-previews">
      <Divider />
      <Header as="h2">Reactions</Header>
      <PostComments key={data.post.id} comments={data.comments} likes={data.likes} goRight />
    </div>
  ) : null;

  return (
    <div style={markerStyle}>
      <Modal
        onClose={() => {
          setViewingPost(false);
          setOpen(false);
        }}
        onOpen={() => {
          setViewingPost(true);
          setOpen(true);
        }}
        open={open}
        trigger={buttonMarker}
      >
        <Modal.Header>
          <Avatar username={data.post.username} name="small-avatar" />
          <div style={{ display: 'inline' }}>
            {title}
          </div>
          <div style={{ fontSize: 'medium' }}>
            {subTitle}
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
                {comments}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Marker;
