export const getStoredUserAuth = (): string => {
  const auth = window.localStorage.getItem('UserAuth');
  if (auth) {
    return JSON.parse(auth);
  }

  return 'DEFAULT_USER_AUTH';
};
