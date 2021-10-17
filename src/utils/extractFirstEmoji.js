import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

async function extractFirstEmoji(string) {
  const emojisArray = splitter.splitGraphemes(string);
  return emojisArray[0];
}

export default extractFirstEmoji;
