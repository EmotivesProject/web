// Used to extract error strings
export function extractErrorObject(error, defaultMessage = 'Sorry action failed, try again later') {
  const errorResponse = error.response ? error.response : null;
  const data = errorResponse ? errorResponse.data : null;
  const message = data ? data.message : null;
  const messageObject = message ? message[0] : null;
  const messageString = messageObject ? messageObject.message : defaultMessage;
  const targetString = messageObject ? messageObject.target : null;

  return {
    message: messageString,
    target: targetString,
  };
}

// Used to extract auth tokens
export function extractToken(result) {
  const { data } = result;
  const uaclResult = data ? data.result : null;
  const username = uaclResult ? uaclResult.username : null;
  const token = uaclResult ? uaclResult.token : null;
  const refreshToken = uaclResult ? uaclResult.refresh_token : null;

  return {
    username,
    token,
    refreshToken,
  };
}
