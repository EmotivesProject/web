import { expect } from 'chai';
import messengerState from '../reducers';

const currentState = {
  messages: [{
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID',
    message: 'fakeMessage',
    username_from: 'fakeUser',
    username_to: 'otherUser',
  }, {
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID2',
    message: 'fakeMessage2',
    username_from: 'otherUser',
    username_to: 'fakeUser',
  }, {
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID3',
    message: 'fakeMessage3',
    username_from: 'fakeUser',
    username_to: 'otherUser',
  }],
  users: [{
    username: 'activeUser',
    active: true,
  }, {
    username: 'inactiveUser',
    active: false,
  }],
  talkingTo: 'anotherUser',
  client: null,
};

describe('The messenger reducer can interact with messenger state', () => {
  it('A new message will be stored in the array on a new socket message', () => {
    const testState = currentState;

    const fakeAction = {
      type: 'WEBSOCKET_MESSAGE',
      payload: {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID4',
        message: 'fakeMessage4',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      },
    };

    const expected = {
      messages: [{
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID',
        message: 'fakeMessage',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID2',
        message: 'fakeMessage2',
        username_from: 'otherUser',
        username_to: 'fakeUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID3',
        message: 'fakeMessage3',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID4',
        message: 'fakeMessage4',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }],
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }],
      talkingTo: 'anotherUser',
      client: null,
    };

    const actual = messengerState(testState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it('Fetched Messages will replace the messages', () => {
    const testState = currentState;

    const fakeAction = {
      type: 'FETCHED_MESSAGES',
      payload: {
        messages: [
          {
            created: '2021-07-17T03:09:31.099Z',
            id: 'testID4',
            message: 'fakeMessage4',
            username_from: 'fakeUser',
            username_to: 'otherUser',
          },
        ],
      },
    };

    const expected = {
      messages: [{
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID4',
        message: 'fakeMessage4',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }],
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }],
      talkingTo: 'anotherUser',
      client: null,
    };

    const actual = messengerState(testState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it('Switch person will remove non relevant messages', () => {
    const initialState = {
      messages: [{
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID',
        message: 'fakeMessage',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID2',
        message: 'fakeMessage2',
        username_from: 'otherUser',
        username_to: 'fakeUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID3',
        message: 'fakeMessage3',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }],
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }],
      talkingTo: 'anotherUser',
      client: null,
    };

    const fakeAction = {
      type: 'SWITCH_PERSON',
      payload: {
        newPerson: 'newTestUser',
        oldPerson: 'fakeUser',
      },
    };

    const expected = {
      messages: [{
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID',
        message: 'fakeMessage',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID2',
        message: 'fakeMessage2',
        username_from: 'otherUser',
        username_to: 'fakeUser',
      }, {
        created: '2021-07-17T03:09:31.099Z',
        id: 'testID3',
        message: 'fakeMessage3',
        username_from: 'fakeUser',
        username_to: 'otherUser',
      }],
      talkingTo: 'newTestUser',
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }],
      client: null,
    };

    const actual = messengerState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it('New Connection adds to the users', () => {
    const initialState = {
      messages: [],
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }],
      talkingTo: 'anotherUser',
      client: null,
    };

    const fakeAction = {
      type: 'NEW_CONNECTION',
      payload: {
        user: {
          username: 'someOtherUser',
          active: true,
        },
      },
    };

    const expected = {
      messages: [],
      talkingTo: 'anotherUser',
      users: [{
        username: 'activeUser',
        active: true,
      }, {
        username: 'inactiveUser',
        active: false,
      }, {
        username: 'someOtherUser',
        active: true,
      }],
      client: null,
    };

    const actual = messengerState(initialState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});
