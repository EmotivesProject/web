import { expect } from 'chai';
import createProfileLink from '../createProfileLink';

describe('Create profile link', () => {
  it('Can create a profile link', () => {
    const result = createProfileLink('test');

    expect(result).equal('http://media.localhost/images/user/test.png');
  });
});
