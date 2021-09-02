import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Emojis from '../constants/Emojis';

// Display an emoji selection panels
// Bit complex please help
const EmojiSelection = ({ page, action }) => {
  const actualPage = page - 1;
  const limit = 3;
  const numberRows = 2;
  const firstArrayStart = actualPage * (limit * numberRows);
  const secondArrayStart = actualPage * (limit * numberRows) + limit;

  const firstArrayEnd = actualPage * (limit * numberRows) + limit;
  const secondArrayEnd = actualPage * (limit * numberRows) + limit + limit;
  const firstArray = Emojis.slice(firstArrayStart, firstArrayEnd);
  const secondArray = Emojis.slice(secondArrayStart, secondArrayEnd);

  let firstRow = null;
  let secondRow = null;

  if (firstArray.length > 0) {
    firstRow = (
      <Grid.Row>
        {firstArray.map((emoji) => (
          <Grid.Column key={emoji}>
            <Button
              className="emoji-selection"
              content={emoji}
              aria-label="Emoji selection button"
              onClick={() => action(emoji)}
              positive
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    );
  }

  if (secondArray.length > 0) {
    secondRow = (
      <Grid.Row>
        {secondArray.map((emoji) => (
          <Grid.Column key={emoji}>
            <Button
              className="emoji-selection"
              content={emoji}
              aria-label="Emoji selection button"
              onClick={() => action(emoji)}
              positive
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    );
  }

  return (
    <Grid columns={limit}>
      {firstRow}
      {secondRow}
    </Grid>
  );
};

export default EmojiSelection;
