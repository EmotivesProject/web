import { expect } from 'chai';
import extractPendingMessages from '../extractPendingMessages';

describe('add or increase result', () => {
  it('Can add or increase result', async () => {
    const result = await extractPendingMessages([
      {
        username_from: 'test',
      },
      {
        username_from: 'test_two',
      },
      {
        username_from: 'test_three',
      },
      {
        username_from: 'test_three',
      },
    ],
    'test');

    expect(result).to.deep.equal([
      {
        total: 1,
        username_from: 'test_two',
      },
      {
        total: 2,
        username_from: 'test_three',
      },
    ]);
  });
});
