import { React, Component } from 'react';
import { Card } from 'semantic-ui-react';

class PostFeed extends Component {
  componentDidMount() {
    console.log('HEY');
  }

  render() {
    const {
      message,
      user,
      created,
    } = this.props;

    this.componentDidMount();

    return (
      <div>
        <Card fluid>
          <Card.Header>
            {user}
          </Card.Header>
          <Card.Meta>
            {created}
          </Card.Meta>
          <Card.Content>
            {message}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default PostFeed;
