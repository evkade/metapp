export const signIn = (user) => ({
  type: "SIGN_IN",
  payload: user,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});
