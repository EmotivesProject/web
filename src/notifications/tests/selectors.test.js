import { expect } from 'chai';
import {
  getError, getPage, getNotifications, getLoading,
} from '../selector';

describe('The notificationState selector', () => {
  const currentState = {
    notifications: [{
      id: 123,
      message: 'test notification',
    }],
    page: 0,
    loading: false,
    errors: null,
  };

  const notifications = {
    notificationState: currentState,
  };

  it('getNotifications returns the notifications array', () => {
    const actual = getNotifications(notifications);

    expect(actual).to.deep.equal([{
      id: 123,
      message: 'test notification',
    }]);
  });

  it('getLoading returns the loading state', () => {
    const actual = getLoading(notifications);

    expect(actual).to.deep.equal(false);
  });

  it('getPage returns the page', () => {
    const actual = getPage(notifications);

    expect(actual).to.deep.equal(0);
  });

  it('getError returns the error', () => {
    const actual = getError(notifications);

    expect(actual).to.deep.equal(null);
  });
});
