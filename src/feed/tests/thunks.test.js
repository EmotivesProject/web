import 'node-fetch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  fetchPostsRequest,
  fetchIndividualPostRequest,
  commentPostRequest,
  likePostRequest,
  unlikePostRequest,
} from '../thunks';

const fakeAuth = {
  token: 'FakeAuthToken',
  refreshToken: 'FakeRefreshToken',
  username: 'FakeUser',
};

process.env.REACT_APP_API_HOST = 'http';
process.env.REACT_APP_POSTIT_BASE_URL = 'postit.localhost';

describe('The Post thunk', () => {
  it('Successful fetch post request dispatches correct actions', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: [
        {
          post: {
            id: 13,
            username: 'imtom',
            content: {
              image_path: null,
              latitude: null,
              longitude: null,
              message: '🥺',
              type: 'emoji',
              zoom: null,
            },
            created_at: '2021-07-10T07:41:58.497579+10:00',
            updated_at: '2021-07-10T07:41:58.497579+10:00',
            active: true,
          },
          comments: null,
          likes: null,
        },
      ],
    };

    mock.onGet('http://postit.localhost/post?page=1').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'UPDATE_LOADING',
      payload: {
        loading: true,
      },
    };

    const expectedSecondAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'posts',
      },
    };

    const expectedThirdAction = {
      type: 'UPDATE_LOADING',
      payload: {
        loading: false,
      },
    };

    const expectedFourthAction = {
      type: 'FETCH_POSTS',
      payload: {
        posts: [{
          post: {
            id: 13,
            username: 'imtom',
            content: {
              image_path: null,
              latitude: null,
              longitude: null,
              message: '🥺',
              type: 'emoji',
              zoom: null,
            },
            created_at: '2021-07-10T07:41:58.497579+10:00',
            updated_at: '2021-07-10T07:41:58.497579+10:00',
            active: true,
          },
          comments: null,
          likes: null,
        },
        ],
        page: 1,
      },
    };

    await fetchPostsRequest(fakeAuth, 1)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);
    expect(fakeDispatch.getCall(2).args[0]).to.deep.equal(expectedThirdAction);
    expect(fakeDispatch.getCall(3).args[0]).to.deep.equal(expectedFourthAction);

    mock.reset();
  });

  it('Successful individual fetch post request dispatches correct actions', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: {
        post: {
          id: 1,
          username: 'imtom',
          content: {
            image_path: null,
            latitude: null,
            longitude: null,
            message: '👍😂',
            type: 'emoji',
            zoom: null,
          },
          created_at: '2021-07-17T13:09:01.515753+10:00',
          updated_at: '2021-07-17T13:09:01.515753+10:00',
          active: true,
        },
        comments: null,
        likes: null,
      },
      message: null,
    };

    mock.onGet('http://postit.localhost/post/1').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'post',
      },
    };

    const expectedSecondAction = {
      type: 'FETCH_POST',
      payload: {
        post: {
          post: {
            id: 1,
            username: 'imtom',
            content: {
              image_path: null,
              latitude: null,
              longitude: null,
              message: '👍😂',
              type: 'emoji',
              zoom: null,
            },
            created_at: '2021-07-17T13:09:01.515753+10:00',
            updated_at: '2021-07-17T13:09:01.515753+10:00',
            active: true,
          },
          comments: null,
          likes: null,
        },
      },
    };

    await fetchIndividualPostRequest(fakeAuth, 1)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    mock.reset();
  });
});

describe('The Comment thunk', () => {
  it('Successful comment create', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: {
        id: 2,
        post_id: 1,
        username: 'imtom',
        message: 'new message',
        created_at: '2021-07-17T14:27:46.440705584+10:00',
        updated_at: '2021-07-17T14:27:46.440705685+10:00',
        active: true,
      },
      message: null,
    };

    mock.onPost('http://postit.localhost/post/1/comment').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'comment',
      },
    };

    const expectedSecondAction = {
      type: 'COMMENT_POST',
      payload: {
        comment: {
          id: 2,
          post_id: 1,
          username: 'imtom',
          message: 'new message',
          created_at: '2021-07-17T14:27:46.440705584+10:00',
          updated_at: '2021-07-17T14:27:46.440705685+10:00',
          active: true,
        },
      },
    };

    await commentPostRequest(fakeAuth, 'new message', 1)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    mock.reset();
  });
});

describe('The like thunk', () => {
  it('Successful like new post', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: {
        id: 2,
        post_id: 1,
        username: 'imtom',
        created_at: '2021-07-17T14:27:23.351761016+10:00',
        updated_at: '2021-07-17T14:27:23.351761506+10:00',
        active: true,
      },
      message: null,
    };

    mock.onPost('http://postit.localhost/post/1/like').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'like',
      },
    };

    const expectedSecondAction = {
      type: 'LIKE_POST',
      payload: {
        like: {
          id: 2,
          post_id: 1,
          username: 'imtom',
          created_at: '2021-07-17T14:27:23.351761016+10:00',
          updated_at: '2021-07-17T14:27:23.351761506+10:00',
          active: true,
        },
      },
    };

    await likePostRequest(fakeAuth, 1)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    mock.reset();
  });

  it('Successful unlike', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: {
        id: 2,
        post_id: 1,
        username: 'imtom',
        created_at: '2021-07-17T14:27:23.351761+10:00',
        updated_at: '2021-07-17T14:27:23.351761+10:00',
        active: false,
      },
      message: null,
    };

    mock.onDelete('http://postit.localhost/post/1/like/2').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'like',
      },
    };

    const expectedSecondAction = {
      type: 'UNLIKE_POST',
      payload: {
        like: {
          id: 2,
          post_id: 1,
          username: 'imtom',
          created_at: '2021-07-17T14:27:23.351761+10:00',
          updated_at: '2021-07-17T14:27:23.351761+10:00',
          active: false,
        },
      },
    };

    await unlikePostRequest(fakeAuth, 1, 2)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    mock.reset();
  });
});
