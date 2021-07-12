import { expect } from 'chai';
import getAuth from '../selector';

describe('The authState selector', () => {
  it('getAuth returns the state', () => {
    const currentState = {
      username: 'tom123',
      token: 'fakeToken',
      refreshToken: 'refresh',
    };

    const auth = {
      authState: currentState,
    };

    const actual = getAuth(auth);

    expect(actual).to.deep.equal(currentState);
  });
});
