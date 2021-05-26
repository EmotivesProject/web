export function extractErrorObject(error, defaultMessage = 'Sorry action failed, try again later') {
  const { data } = error.response;
  const message = data ? data.message : null;
  const messageObject = message ? message[0] : null;
  const messageString = messageObject ? messageObject.message : defaultMessage;
  const targetString = messageObject ? messageObject.target : null;

  return {
    message: messageString,
    target: targetString,
  };
}

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
