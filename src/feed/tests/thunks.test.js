import 'node-fetch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import { fetchPostsRequest } from '../thunks';

const fakeAuth = {
  token: 'FakeAuthToken',
  refreshToken: 'FakeRefreshToken',
  username: 'FakeUser',
};

process.env.REACT_APP_API_HOST = 'http://';
process.env.REACT_APP_POSTIT_BASE_URL = 'localhost';

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
      type: 'API_SUCCESS',
      payload: {
        name: 'posts',
      },
    };

    const expectedSecondAction = {
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

    await fetchPostsRequest(fakeAuth, 1)(fakeDispatch).then();

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    mock.reset();
  });
});
