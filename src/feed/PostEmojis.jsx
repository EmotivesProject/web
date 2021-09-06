import GraphemeSplitter from 'grapheme-splitter';
import React from 'react';
import { Grid } from 'semantic-ui-react';

const splitter = new GraphemeSplitter();

const PostEmojis = ({
  data,
}) => {
  const emojisArray = splitter.splitGraphemes(data);
  const emojis = [...new Set(emojisArray)];

  let max = emojis.length > 6 ? 6 : emojis.length;
  const top = emojis.slice(0, max);

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
            {emoji}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};

export default PostEmojis;
