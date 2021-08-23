import { expect } from 'chai';
import postState from '../reducers';

describe('The post reducer can interact with posts', () => {
  it('Creating a post adds it to the previous posts at the front', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      finished: false,
      posts: [{
        id: 1,
        content: {
          message: 'previous post',
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'CREATE_POST',
      payload: {
        post: {
          id: 2,
          content: {
            message: 'new post',
          },
          comments: [],
          likes: [],
        },
      },
    };

    const expected = {
      page: 0,
      loading: false,
      error: null,
      finished: false,
      posts: [
        {
          id: 2,
          content: {
            message: 'new post',
          },
          comments: [],
          likes: [],
        },
        {
          id: 1,
          content: {
            message: 'previous post',
          },
          comments: [
            {
              id: 2,
              username: 'john',
              message: 'I like it',
            },
          ],
          likes: [],
        },
      ],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('removing a post removes it from the post array', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      finished: false,
      posts: [{
        id: 1,
        content: {
          message: 'previous post',
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'REMOVE_POST',
      payload: {
        post: {
          id: 1,
        },
      },
    };

    const expected = {
      page: 0,
      loading: false,
      finished: false,
      error: null,
      posts: [],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('Fetch posts adds it to the correct array and increments the page', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      finished: false,
      posts: [],
      errors: null,
    };

    const fakeAction = {
      type: 'FETCH_POSTS',
      payload: {
        posts: {
          id: 1,
        },
        page: 0,
      },
    };

    const expected = {
      page: 1,
      loading: false,
      error: null,
      finished: false,
      posts: [{
        id: 1,
      }],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('Fetch post overwrites it to the correct array and resets the page', () => {
    const initialState = {
      page: 5,
      loading: false,
      error: null,
      finished: false,
      posts: [{
        id: 1,
        content: {
          message: 'previous post',
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'FETCH_POST',
      payload: {
        post: {
          id: 2,
        },
        page: 0,
      },
    };

    const expected = {
      page: 0,
      loading: false,
      finished: false,
      error: null,
      posts: [{
        id: 2,
      }],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('Loading post updates the loading value', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      posts: [],
      errors: null,
    };

    const fakeAction = {
      type: 'LOADING_POSTS',
    };

    const expected = {
      page: 0,
      loading: true,
      error: null,
      posts: [],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});

describe('The post reducer can interact with likes', () => {
  it('Liking a post updates the like array', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'LIKE_POST',
      payload: {
        like: {
          post_id: 1,
          username: 'test_user',
        },
      },
    };

    const expected = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [{
          post_id: 1,
          username: 'test_user',
        }],
      }],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('A post can be unliked', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [{
          post_id: 1,
          username: 'test_user',
        }],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'UNLIKE_POST',
      payload: {
        like: {
          post_id: 1,
          username: 'test_user',
        },
      },
    };

    const expected = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});

describe('The post reducer can interact with comments', () => {
  it('comment a post updates the comments array', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const fakeAction = {
      type: 'COMMENT_POST',
      payload: {
        comment: {
          post: {
            id: 1,
            content: {
              message: 'previous post',
            },
          },
          comments: [
            {
              id: 2,
              username: 'john',
              message: 'I like it',
            },
            {
              post_id: 1,
              id: 3,
              message: 'hey',
              username: 'test_user',
            },
          ],
          likes: [],
        },
      },
    };

    const expected = {
      page: 0,
      loading: false,
      error: null,
      posts: [{
        post: {
          id: 1,
          content: {
            message: 'previous post',
          },
        },
        comments: [
          {
            id: 2,
            username: 'john',
            message: 'I like it',
          },
          {
            post_id: 1,
            id: 3,
            message: 'hey',
            username: 'test_user',
          },
        ],
        likes: [],
      }],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});

describe('The post reducer can interact with api erroring', () => {
  it('API error updates errors', () => {
    const initialState = {
      page: 0,
      loading: false,
      finished: false,
      error: null,
      posts: [],
      errors: null,
    };

    const fakeAction = {
      type: 'API_ERROR',
      payload: {
        name: 'posts',
      },
    };

    const expected = {
      page: 0,
      loading: false,
      finished: false,
      error: null,
      posts: [],
      errors: 'posts',
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
  it('API success updates errors to null', () => {
    const initialState = {
      page: 0,
      loading: false,
      error: null,
      posts: [],
      errors: 'posts',
    };

    const fakeAction = {
      type: 'API_SUCCESS',
    };

    const expected = {
      page: 0,
      loading: false,
      error: null,
      posts: [],
      errors: null,
    };

    const actual = postState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});
