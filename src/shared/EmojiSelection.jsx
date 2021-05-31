import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import emojis from '../constants/emojis';

const EmojiSelection = ({ page, action }) => {
  const actualPage = page - 1;
  const limit = 3;
  const numberRows = 2;
  const firstArrayStart = actualPage * (limit * numberRows);
  const secondArrayStart = actualPage * (limit * numberRows) + limit;

  const firstArrayEnd = actualPage * (limit * numberRows) + limit;
  const secondArrayEnd = actualPage * (limit * numberRows) + limit + limit;
  const firstArray = emojis.slice(firstArrayStart, firstArrayEnd);
  const secondArray = emojis.slice(secondArrayStart, secondArrayEnd);

  let firstRow = null;
  let secondRow = null;

  if (firstArray.length > 0) {
    firstRow = (
      <Grid.Row>
        {firstArray.map((emoji) => (
          <Grid.Column key={emoji}>
            <Button
              content={emoji}
              labelPosition="right"
              icon="checkmark"
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
              content={emoji}
              labelPosition="right"
              icon="checkmark"
              onClick={() => action(emoji)}
              positive
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    );
  }

  return (
    <Grid columns={limit} divided>
      {firstRow}
      {secondRow}
    </Grid>
  );
};

export default EmojiSelection;
