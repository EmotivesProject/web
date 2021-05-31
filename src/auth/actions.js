export const CREATE_AUTH = 'CREATE_AUTH';
export const createAuth = (auth) => ({
  type: CREATE_AUTH,
  payload: { auth },
});

export const UPDATE_AUTH = 'UPDATE_AUTH';
export const updateAuth = (auth) => ({
  type: UPDATE_AUTH,
  payload: { auth },
});

export const REMOVE_AUTH = 'REMOVE_AUTH';
export const removeAuth = () => ({
  type: REMOVE_AUTH,
});
