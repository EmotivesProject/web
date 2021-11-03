import { expect } from 'chai';
import { extractErrorObject, extractToken } from '../extractObjects';

describe('Extract error object', () => {
  it('Can extract an error object', async () => {
    const result = await extractErrorObject({
      response: {
        data: {
          result: {},
          message: [
            {
              message: 'Username incorrect',
              target: 'username',
            },
          ],
        },
      },
    });

    expect(result).to.deep.equal({
      message: 'Username incorrect',
      target: 'username',
    });
  });

  it('Can extract a default error object', () => {
    const result = extractErrorObject({});

    expect(result).to.deep.equal({
      message: 'Sorry action failed, try again later',
      target: null,
    });
  });
});

describe('Extract token', () => {
  it('Can extract a token object', async () => {
    const result = await extractToken({
      data: {
        result: {
          username: 'test',
          token: 'test_token',
          refresh_token: 'test_refresh_token',
        },
        message: [],
      },
    });

    expect(result).to.deep.equal({
      refreshToken: 'test_refresh_token',
      token: 'test_token',
      username: 'test',
    });
  });

  it('Can extract a default token object', () => {
    const result = extractToken({});

    expect(result).to.deep.equal({
      refreshToken: null,
      token: null,
      username: null,
    });
  });
});
