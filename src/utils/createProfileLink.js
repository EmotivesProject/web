function createProfileLink(username) {
  const host = process.env.REACT_APP_API_HOST;
  const baseURL = process.env.REACT_APP_MEDIA_BASE_URL;
  return `${host}://${baseURL}/images/user/${username}.jpg`;
}

export default createProfileLink;
