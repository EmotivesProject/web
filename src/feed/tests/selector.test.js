import { expect } from 'chai';
import { getError, getPage, getPosts } from '../selector';

describe('The postState selector', () => {
  const currentState = {
    posts: [{
      content: 'postcontent',
    }],
    page: 1,
    errors: 'likes',
  };

  const posts = {
    postState: currentState,
  };

  it('getPosts returns the post array', () => {
    const actual = getPosts(posts);

    expect(actual).to.deep.equal([{
      content: 'postcontent',
    }]);
  });

  it('getPage returns the page', () => {
    const actual = getPage(posts);

    expect(actual).to.deep.equal(1);
  });

  it('getPage returns the page', () => {
    const actual = getPage(posts);

    expect(actual).to.deep.equal(1);
  });

  it('getError returns the error', () => {
    const actual = getError(posts);

    expect(actual).to.deep.equal('likes');
  });
});
