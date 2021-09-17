import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Emojis, { NumberPerPage } from '../constants/Emojis';

// Display an emoji selection panels
// Bit complex please help
const EmojiSelection = ({ page, action }) => {
  const actualPage = page - 1;
  const limit = NumberPerPage;
  const firstArrayStart = actualPage * (limit);
  const firstArrayEnd = firstArrayStart + limit;
  const firstArray = Emojis.slice(firstArrayStart, firstArrayEnd);

  let row = null;

  if (firstArray.length > 0) {
    row = (
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        {firstArray.map((emoji) => (
          <Button
            className="emoji-selection"
            key={Math.random().toString(36).substr(2, 9)}
            content={emoji}
            aria-label="Emoji selection button"
            onClick={() => action(emoji)}
          />
        ))}
      </div>
    );
  }

  return (
    <Grid>
      {row}
    </Grid>
  );
};

export default EmojiSelection;
