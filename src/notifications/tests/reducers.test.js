import { expect } from 'chai';
import notificationState from '../reducers';

const currentState = {
  notifications: [{
    id: '60ffde215306eef093060418',
    username: 'imtom',
    type: 'message',
    title: 'New message!',
    message: 'second messaged you: 🥺',
    link: 'https://localhost/messenger?talking-to=second',
    username_to: 'imtom',
    created_at: '2021-07-27T10:21:21.429Z',
    seen: true,
  },
  {
    id: '60ffcb525306eef093060412',
    username: 'imtom',
    type: 'comment',
    title: 'New Comment!',
    message: 'second commented on your post',
    link: 'http://emotives.net/post/3',
    username_to: 'second',
    created_at: '2021-07-27T09:01:06.434Z',
    seen: false,
  }],
  page: 0,
  loading: false,
  errors: null,
};

describe('The notification reducer can interact with notification state', () => {
  it('Can update the loading state', () => {
    const testState = currentState;

    const fakeAction = {
      type: 'SET_LOADING',
      payload: {
        loadingState: true,
      },
    };

    const expected = {
      notifications: [{
        id: '60ffde215306eef093060418',
        username: 'imtom',
        type: 'message',
        title: 'New message!',
        message: 'second messaged you: 🥺',
        link: 'https://localhost/messenger?talking-to=second',
        username_to: 'imtom',
        created_at: '2021-07-27T10:21:21.429Z',
        seen: true,
      },
      {
        id: '60ffcb525306eef093060412',
        username: 'imtom',
        type: 'comment',
        title: 'New Comment!',
        message: 'second commented on your post',
        link: 'http://emotives.net/post/3',
        username_to: 'second',
        created_at: '2021-07-27T09:01:06.434Z',
        seen: false,
      }],
      page: 0,
      loading: true,
      errors: null,
    };

    const actual = notificationState(testState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it('Can update the error state', () => {
    const testState = currentState;

    const fakeAction = {
      type: 'API_ERROR',
      payload: {
        name: 'notification',
      },
    };

    const expected = {
      notifications: [{
        id: '60ffde215306eef093060418',
        username: 'imtom',
        type: 'message',
        title: 'New message!',
        message: 'second messaged you: 🥺',
        link: 'https://localhost/messenger?talking-to=second',
        username_to: 'imtom',
        created_at: '2021-07-27T10:21:21.429Z',
        seen: true,
      },
      {
        id: '60ffcb525306eef093060412',
        username: 'imtom',
        type: 'comment',
        title: 'New Comment!',
        message: 'second commented on your post',
        link: 'http://emotives.net/post/3',
        username_to: 'second',
        created_at: '2021-07-27T09:01:06.434Z',
        seen: false,
      }],
      page: 0,
      loading: false,
      errors: 'notification',
    };

    const actual = notificationState(testState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it('Can load notifications', () => {
    const testState = {
      notifications: [{
        id: '60ffde215306eef093060418',
        username: 'imtom',
        type: 'message',
        title: 'New message!',
        message: 'second messaged you: 🥺',
        link: 'https://localhost/messenger?talking-to=second',
        username_to: 'imtom',
        created_at: '2021-07-27T10:21:21.429Z',
        seen: true,
      },
      {
        id: '60ffcb525306eef093060412',
        username: 'imtom',
        type: 'comment',
        title: 'New Comment!',
        message: 'second commented on your post',
        link: 'http://emotives.net/post/3',
        username_to: 'second',
        created_at: '2021-07-27T09:01:06.434Z',
        seen: false,
      }],
      page: 0,
      loading: false,
      errors: null,
    };

    const fakeAction = {
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
        page: 0,
      },
    };

    const expected = {
      notifications: [{
        id: '60ffde215306eef093060418',
        username: 'imtom',
        type: 'message',
        title: 'New message!',
        message: 'second messaged you: 🥺',
        link: 'https://localhost/messenger?talking-to=second',
        username_to: 'imtom',
        created_at: '2021-07-27T10:21:21.429Z',
        seen: true,
      },
      {
        id: '60ffcb525306eef093060412',
        username: 'imtom',
        type: 'comment',
        title: 'New Comment!',
        message: 'second commented on your post',
        link: 'http://emotives.net/post/3',
        username_to: 'second',
        created_at: '2021-07-27T09:01:06.434Z',
        seen: false,
      },
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
      }],
      page: 1,
      loading: false,
      errors: null,
    };

    const actual = notificationState(testState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});
