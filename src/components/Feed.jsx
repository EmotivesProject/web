/* eslint no-underscore-dangle: 0 */
import axios from 'axios';
import { React, Component } from 'react';
import { TextArea, Form, Button } from 'semantic-ui-react';
import PostFeed from './PostFeed';
import { setToken, getToken } from '../utils/auth';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: '',
      PostPage: 0,
      Posts: [],
      UserID: '',
    };
  }

  componentDidMount() {
    let {
      PostPage,
    } = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;

    const token = getToken('auth');
    const userToken = getToken('user');

    if (userToken === undefined) {
      const userUrl = `${host}://${base}/user`;
      axios.get(userUrl, {
        headers: {
          Authorization: token,
        },
      })
        .then((result) => {
          const fetchedID = result.data.result.id;
          setToken('user', fetchedID);
          this.setState({ UserID: fetchedID });
        });
    }

    const url = `${host}://${base}/post?page=${PostPage}`;

    axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((result) => {
        const fetchedPosts = result.data.result;
        PostPage += 1;
        this.setState({ PostPage });
        this.setState({ Posts: fetchedPosts });
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    const url = `${host}://${base}/post`;

    const body = JSON.stringify({
      message: data.Message,
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
          Message: '',
        });
      });
  }

  render() {
    const {
      Message,
      Posts,
      UserID,
    } = this.state;

    let feedItems;

    if (Posts != null) {
      feedItems = Posts.map((post) => (
        <PostFeed
          key={Math.random().toString(36).substr(2, 9)}
          id={post._id}
          created={post.created}
          likes={post.user_likes.length}
          message={post.message}
          user={post.user[0]}
          userComments={post.user_comments}
          userLikes={post.user_likes}
          loggedIn={UserID}
        />
      ));
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea
            placeholder="Update your status"
            name="Message"
            value={Message}
            onChange={this.handleChange}
          />
          <Button primary size="large">
            Update Now
          </Button>
        </Form>
        {feedItems}
      </div>
    );
  }
}

export default Feed;
