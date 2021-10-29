/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { getName } from 'emoji-dictionary';
import {
  Faces,
  Hands,
  People,
  Clothing,
  AnimalsAndNature,
  Food,
  Sport,
  Travel,
  Objects,
  Symbols,
} from '../constants/Emojis';
import randomKey from '../utils/randomKey';

// Display an emoji selection panels
// Bit complex please might refactor
const EmojiSelection = ({ action, initialInput }) => {
  const [emojiFilter, setEmojiFilter] = useState(initialInput);

  const excludeEmoji = (emoji) => {
    if (emojiFilter === '') {
      return true;
    }
    const name = getName(emoji);
    return name === undefined
      ? false
      : name.includes(emojiFilter);
  };

  const createRowForEmoji = (emojis, title) => {
    const filteredEmojis = emojis.filter((emoji) => excludeEmoji(emoji));

    return filteredEmojis.length !== 0 ? (
      <>
        <h3 style={{ marginLeft: '1em' }}>{title}</h3>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          {filteredEmojis.map((emoji) => (
            <Button
              className="padding green xx-large"
              key={randomKey()}
              content={emoji}
              aria-label="Emoji selection button"
              onClick={() => action(emoji)}
            />
          ))}
        </div>
      </>
    ) : null;
  };

  return (
    <div style={{ marginTop: '-2em' }}>
      <Input
        id="emoji-filter"
        name="EmojiFilter"
        type="input"
        icon="search"
        iconPosition="right"
        size="large"
        placeholder="Search for an emoji"
        value={emojiFilter}
        onChange={(e) => setEmojiFilter(e.target.value)}
        label="Search"
        labelPosition="left"
        fluid
      />
      <div id="emoji-selection-previews">
        {createRowForEmoji(Faces, 'Faces')}
        {createRowForEmoji(Hands, 'Hands')}
        {createRowForEmoji(People, 'People')}
        {createRowForEmoji(Clothing, 'Clothing')}
        {createRowForEmoji(AnimalsAndNature, 'Animals And Nature')}
        {createRowForEmoji(Food, 'Food And Drink')}
        {createRowForEmoji(Sport, 'Sport')}
        {createRowForEmoji(Travel, 'Travel')}
        {createRowForEmoji(Objects, 'Objects')}
        {createRowForEmoji(Symbols, 'Symbols')}
      </div>
    </div>
  );
};

export default EmojiSelection;
