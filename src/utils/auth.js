export function setToken(userToken) {
  // 1 month expiration
  const d = new Date();
  d.setTime(d.getTime() + (43800 * 60 * 1000));

  const token = `Bearer ${userToken}`;
  const fullAuth = JSON.stringify({ expiry: d, token });
  localStorage.setItem('auth', fullAuth);
}

export function RemoveToken() {
  localStorage.removeItem('auth');
}
