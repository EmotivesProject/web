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
    };
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  attemptLike = (event) => {
    event.preventDefault();

    const { id } = this.props;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    const url = `${host}://${base}/post/${id}/like`;

    const token = getToken('auth');

    axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  render() {
    const {
      message,
      user,
      created,
      likes,
      userComments,
    } = this.props;

    const {
      NewComment,
    } = this.state;

    const comments = userComments.map((comment) => (
      <Comment key={Math.random().toString(36).substr(2, 9)}>
        <Comment.Content>
          <Comment.Author>{comment.user[0].username}</Comment.Author>
          <Comment.Metadata>{comment.created}</Comment.Metadata>
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
                <Button primary size="large">
                  Like
                </Button>
              </Form>
            </Card.Header>
            <Card.Meta>
              {created}
            </Card.Meta>
            <Card.Content>
              {message}
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
