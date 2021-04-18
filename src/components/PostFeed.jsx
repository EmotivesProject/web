/* eslint no-underscore-dangle: 0 */
import { React, Component } from 'react';
import axios from 'axios';

import {
  Card,
  Comment,
  Header,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';

import { getToken } from '../utils/auth';

class PostFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewComment: '',
      AlreadyLiked: false,
      LikedId: '',
    };
  }

  componentDidMount() {
    const {
      userLikes,
    } = this.props;
    const userID = getToken('user');

    for (let i = 0; i < userLikes.length; i += 1) {
      if (userLikes[i].username.id === userID) {
        this.setState({
          LikedId: userLikes[i].id,
          AlreadyLiked: true,
        });
        return;
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addComment = (event) => {
    event.preventDefault();

    const { id } = this.props;

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    const url = `${host}://${base}/post/${id}/comment`;

    const body = JSON.stringify({
      message: data.NewComment,
    });

    const token = getToken('auth');

    axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(() => {
        this.setState({
          NewComment: '',
        });
      });
  }

  attemptLike = (event) => {
    event.preventDefault();

    const { id } = this.props;

    const { AlreadyLiked, LikedId } = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    let url;
    const token = getToken('auth');

    if (AlreadyLiked) {
      url = `${host}://${base}/post/${id}/like/${LikedId}/`;
      axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    } else {
      url = `${host}://${base}/post/${id}/like`;
      axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    }
  }

  render() {
    const {
      id,
      user,
      created,
      likes,
      userComments,
      latitude,
      longitude,
    } = this.props;

    const {
      NewComment,
      AlreadyLiked,
    } = this.state;

    let { message } = this.props;

    let button;
    if (AlreadyLiked) {
      button = <Button primary size="large">Unlike</Button>;
    } else {
      button = <Button primary size="large">like</Button>;
    }

    let mapImage;
    if (latitude && longitude) {
      if (message === undefined) {
        message = 'QUT';
      }
      const imageSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_KEY}&q=${message}&center=${latitude},${longitude}`;
      mapImage = (
        <iframe
          title={id}
          width="500"
          height="400"
          loading="lazy"
          src={imageSrc}
        />
      );
      message = undefined;
    }

    const comments = userComments.map((comment) => (
      <Comment key={Math.random().toString(36).substr(2, 9)}>
        <Comment.Content>
          <Comment.Author>{comment.username}</Comment.Author>
          <Comment.Metadata>{comment.created_at}</Comment.Metadata>
          <Comment.Text>{comment.message}</Comment.Text>
        </Comment.Content>
      </Comment>
    ));

    return (
      <div>
        <Segment>
          <Card fluid>
            <Card.Header>
              {user.username}
              <br />
              Likes:
              {likes}
              <Form onSubmit={this.attemptLike}>
                {button}
              </Form>
            </Card.Header>
            <Card.Meta>
              {created}
            </Card.Meta>
            <Card.Content>
              {message}
              {mapImage}
            </Card.Content>
          </Card>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
            </Header>
            {comments}
            <Form reply onSubmit={this.addComment}>
              <Form.TextArea
                name="NewComment"
                value={NewComment}
                onChange={this.handleChange}
              />
              <Button content="Add Comment" labelPosition="left" icon="edit" primary />
            </Form>
          </Comment.Group>
        </Segment>
      </div>
    );
  }
}

export default PostFeed;
