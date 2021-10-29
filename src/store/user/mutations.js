export default {
  userChanger(state, payload) {
    state.user = payload.user;
  },

  isLoggedInChanger(state, payload) {
    state.isLoggedIn = payload.isLoggedIn;
  },

  authTokenChanger(state, payload) {
    state.authToken = payload.authToken;
  },

  errorChanger(state, payload) {
    state.error = payload.error;
  },
};
