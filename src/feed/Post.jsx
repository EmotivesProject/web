import React from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import EmojiInput from '../shared/EmojiInput';
import Avatar from '../shared/Avatar';
import getTimeAgoFromObject from '../utils/date';
import PostComments from './PostComments';

const defaultZoom = 16;

const markerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
  fontSize: 'xx-large',
  position: 'absolute',
  left: '-10px',
  top: '-20px',
};

const Post = ({
  auth, data, likePost, unlikePost, commentPost,
}) => {
  let mainInformation = <>Default message</>;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const initialCentre = {
      lat: content.latitude,
      lng: content.longitude,
    };
    // Would prefer not to have this logic...
    mainInformation = process.env.STORYBOOK_RUN === undefined ? (
      <div className="post-map" style={{ position: 'relative', width: '500px', height: '400px' }}>
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
        <a
          href={`/explore?id=${data.post.id}&lat=${content.latitude}&lng=${content.longitude}`}
          aria-label="Explore here"
          className="map-explore-link"
          style={{
            position: 'absolute', top: 0, left: '0px', display: 'inline-block', width: '500px', height: '400px',
          }}
        >
          Explore here
        </a>
      </div>
    ) : (
      <div style={{
        width: '500px',
        height: '400px',
      }}
      >
        Placeholder
      </div>
    );
  }

  let button = (
    <Button
      onClick={() => likePost(auth, data.post.id)}
      className="like-button"
      icon
      aria-label="like post"
      title="Like the post"
      tabIndex="0"
      content={<Icon name="like" />}
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
        content={<Icon name="like" />}
      />
    );
  }

  const visitedString = data.post.content.title ? `visited ${data.post.content.title}` : null;
  const reactionString = data.post.content.reaction ? `${data.post.content.reaction}` : null;

  const comments = data.comments.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h3">Reactions</Header>
      <PostComments key={data.post.id} data={data.comments} />
    </div>
  ) : null;

  return (
    <Segment className="main-post-segment">
      <Container>
        <Header as="h2" dividing>
          <Avatar username={data.post.username} name="small-avatar" />
          {data.post.username}
          &nbsp;
          {visitedString}
          &nbsp;
          {reactionString}
          <Header.Subheader id="post-subheader">
            <Icon name="like" />
            {data.likes ? data.likes.length : 0}
            &nbsp;
            <Icon name="clock" />
            {getTimeAgoFromObject(data.post.updated_at)}
          </Header.Subheader>
        </Header>
        <Container textAlign="center" id="main-post">
          {mainInformation}
        </Container>
      </Container>
      <Divider />
      <Container>
        <Grid columns={2} textAlign="center">
          <Grid.Column>
            {button}
          </Grid.Column>
          <Grid.Column>
            <EmojiInput
              header="Comment on post"
              type="comment"
              action={commentPost}
              auth={auth}
              postID={data.post.id}
              subComponentID="emoji-comment-input"
              iconName="comment"
              content={<Icon name="comment" />}
            />
          </Grid.Column>
        </Grid>
      </Container>
      {comments}
    </Segment>
  );
};

export default Post;
