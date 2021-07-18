import { expect } from 'chai';
import {
  getMessages,
  getTalkingTo,
  getClient,
  getUsers,
  getActiveUsers,
  getInactiveUsers,
} from '../selector';

describe('The messangerState selector', () => {
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

  const messanger = {
    messengerState: currentState,
  };

  it('getMessages returns the messages array', () => {
    const actual = getMessages(messanger);

    expect(actual).to.deep.equal([{
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
    }]);
  });

  it('getTalkingTo returns who the client is talking to', () => {
    const actual = getTalkingTo(messanger);

    expect(actual).to.deep.equal('anotherUser');
  });

  it('getClient returns the client object', () => {
    const actual = getClient(messanger);

    expect(actual).to.deep.equal(null);
  });

  it('getUsers returns the user', () => {
    const actual = getUsers(messanger);

    expect(actual).to.deep.equal([{
      username: 'activeUser',
      active: true,
    }, {
      username: 'inactiveUser',
      active: false,
    }]);
  });

  it('getActiveUsers returns the active users', () => {
    const actual = getActiveUsers(messanger);

    expect(actual).to.deep.equal([{
      username: 'activeUser',
      active: true,
    }]);
  });

  it('getInactiveUsers returns the inactive users', () => {
    const actual = getInactiveUsers(messanger);

    expect(actual).to.deep.equal([{
      username: 'inactiveUser',
      active: false,
    }]);
  });
});
