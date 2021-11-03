import { expect } from 'chai';
import extractFirstEmoji from '../extractFirstEmoji';

describe('Extract first emoji', () => {
  it('Can extract the first emoji', async () => {
    const result = await extractFirstEmoji('😀');

    expect(result).equal('😀');
  });

  it('Can extract the first emoji from array', async () => {
    const result = await extractFirstEmoji('😀 😃 😄 😁 😆');

    expect(result).equal('😀');
  });

  it('Handle blank', async () => {
    const result = await extractFirstEmoji('');

    expect(result).equal(undefined);
  });
});
