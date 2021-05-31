import { expect } from 'chai';
import authState from '../reducers';

describe('The authState reducer', () => {
  it('Adds a new auth state when create auth action is received', () => {
    const fakeAuth = {
      username: 'tom123',
      token: 'fakeToken',
      refreshToken: 'refresh',
    };

    const fakeAction = {
      type: 'CREATE_AUTH',
      payload: {
        auth: fakeAuth,
      },
    };

    const originalState = null;

    const expected = {
      username: 'tom123',
      token: 'fakeToken',
      refreshToken: 'refresh',
    };

    const actual = authState(originalState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});
