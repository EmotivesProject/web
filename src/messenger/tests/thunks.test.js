import 'node-fetch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  getUsersRequest,
  requestPreviousMessages,
} from '../thunks';

process.env.REACT_APP_API_HOST = 'http';
process.env.REACT_APP_CHATTER_BASE_URL = 'chatter.localhost';

describe('The messenger thunk', () => {
  it('Able to get connections', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: [
        {
          username: 'imtom',
          active: false,
        },
        {
          username: 'second',
          active: false,
        },
      ],
      message: null,
    };

    mock.onGet('http://chatter.localhost/connections').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'SET_USERS',
      payload: {
        users: [{
          username: 'imtom',
          active: false,
        },
        {
          username: 'second',
          active: false,
        }],
      },
    };

    await getUsersRequest()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);

    mock.reset();
  });

  it('Able to get previous messages', async () => {
    const fakeDispatch = sinon.spy();
    const mock = new MockAdapter(axios);

    const fakeResult = {
      result: [
        {
          id: '60f249ebf27c64cf8818439c',
          username_from: 'imtom',
          username_to: 'second',
          message: '🥺',
          created: '2021-07-17T03:09:31.099Z',
        },
        {
          id: '60f24ad4f27c64cf8818439e',
          username_from: 'second',
          username_to: 'imtom',
          message: '🥺',
          created: '2021-07-17T03:13:24.777Z',
        },
      ],
      message: null,
    };

    mock.onGet('http://chatter.localhost/messages?from=imtom&to=second').reply(200, fakeResult);

    const expectedFirstAction = {
      type: 'FETCHED_MESSAGES',
      payload: {
        messages: [
          {
            id: '60f249ebf27c64cf8818439c',
            username_from: 'imtom',
            username_to: 'second',
            message: '🥺',
            created: '2021-07-17T03:09:31.099Z',
          },
          {
            id: '60f24ad4f27c64cf8818439e',
            username_from: 'second',
            username_to: 'imtom',
            message: '🥺',
            created: '2021-07-17T03:13:24.777Z',
          },
        ],
      },
    };

    await requestPreviousMessages('something', 'imtom', 'second')(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);

    mock.reset();
  });
});
