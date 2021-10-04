import React from 'react';
import { Button } from 'semantic-ui-react';
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

// Display an emoji selection panels
// Bit complex please might refactor
const EmojiSelection = ({ action }) => {
  const createRowForEmoji = (emojis) => (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      {emojis.map((emoji) => (
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

  return (
    <div id="emoji-selection-previews">
      <h3 className="emoji-selection-title">Faces</h3>
      {createRowForEmoji(Faces)}
      <h3 className="emoji-selection-title">Hands</h3>
      {createRowForEmoji(Hands)}
      <h3 className="emoji-selection-title">People</h3>
      {createRowForEmoji(People)}
      <h3 className="emoji-selection-title">Clothing</h3>
      {createRowForEmoji(Clothing)}
      <h3 className="emoji-selection-title">Animals And Nature</h3>
      {createRowForEmoji(AnimalsAndNature)}
      <h3 className="emoji-selection-title">Food And Drink</h3>
      {createRowForEmoji(Food)}
      <h3 className="emoji-selection-title">Sport</h3>
      {createRowForEmoji(Sport)}
      <h3 className="emoji-selection-title">Travel</h3>
      {createRowForEmoji(Travel)}
      <h3 className="emoji-selection-title">Objects</h3>
      {createRowForEmoji(Objects)}
      <h3 className="emoji-selection-title">Symbols</h3>
      {createRowForEmoji(Symbols)}
    </div>
  );
};

export default EmojiSelection;
