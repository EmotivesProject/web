import 'node-fetch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  getNotificationsRequest,
} from '../thunks';

process.env.REACT_APP_API_HOST = 'http';
process.env.REACT_APP_NOTIF_BASE_URL = 'notif.localhost';

describe('The messenger thunk', () => {
  it('Able to get connections', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: [
        {
          id: '60ffcb525306eef093060413',
          username: 'imtom',
          type: 'comment',
          title: 'New Comment!',
          message: 'second commented on your post',
          link: 'http://emotives.net/post/3',
          username_to: 'second',
          created_at: '2021-07-27T09:01:06.434Z',
          seen: false,
        },
      ],
      message: null,
    };

    mock.onGet('http://notif.localhost/notification?page=1').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'SET_LOADING',
      payload: {
        loadingState: true,
      },
    };

    const expectedSecondAction = {
      type: 'API_SUCCESS',
      payload: {
        name: 'notifications',
      },
    };

    const expectedThirdAction = {
      type: 'NOTIFICATIONS_LOADED',
      payload: {
        notifications: [
          {
            id: '60ffcb525306eef093060413',
            username: 'imtom',
            type: 'comment',
            title: 'New Comment!',
            message: 'second commented on your post',
            link: 'http://emotives.net/post/3',
            username_to: 'second',
            created_at: '2021-07-27T09:01:06.434Z',
            seen: false,
          },
        ],
        page: 1,
      },
    };

    const expectedFourthAction = {
      type: 'SET_LOADING',
      payload: {
        loadingState: false,
      },
    };

    const fakeAuth = {
      token: 'test_token',
    };

    await getNotificationsRequest(fakeAuth, 1)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);
    expect(fakeDispatch.getCall(2).args[0]).to.deep.equal(expectedThirdAction);
    expect(fakeDispatch.getCall(3).args[0]).to.deep.equal(expectedFourthAction);

    mock.reset();
  });
});