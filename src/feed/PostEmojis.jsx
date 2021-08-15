import React from 'react';
import { Grid } from 'semantic-ui-react';

const PostEmojis = ({
  data,
}) => {
  let max = data.length > 6 ? 6 : data.length;
  const top = data.slice(0, max);

  if (max === 0) {
    max = 1;
  }

  return (
    <Grid columns={max} id="comment">
      <Grid.Row textAlign="center">
        {top.map((emoji) => (
          <Grid.Column
            key={Math.random().toString(36).substr(2, 9)}
          >
            {emoji.emoji}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};

export default PostEmojis;
