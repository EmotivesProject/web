import axios from 'axios';
import { React, Component } from 'react';
import { TextArea, Form, Button } from 'semantic-ui-react';
import PostFeed from './PostFeed';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: '',
      PostPage: 0,
      Posts: [],
    };
  }

  componentDidMount() {
    let {
      PostPage,
    } = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    const url = `${host}://${base}/post?page=${PostPage}`;

    const token = this.getToken();

    if (token) {
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
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getToken = () => {
    const tokenString = localStorage.getItem('auth');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_POSTIT_BASE_URL;
    const url = `${host}://${base}/post`;

    const body = JSON.stringify({
      message: data.Message,
    });

    const token = this.getToken();

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
    } = this.state;

    const feedItems = Posts.map((post) => (
      <PostFeed
        key={post.id}
        id={post.id}
        created={post.created}
        user={post.user}
        message={post.message}
      />
    ));

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
