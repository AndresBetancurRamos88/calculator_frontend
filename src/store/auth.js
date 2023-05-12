export default {
  state: {
    auth: {
      isLoggedIn: false,
      username: null
    }
  },
  mutations: {
    setIsLoggedIn(state, value) {
      state.auth.isLoggedIn = value;
    },
    setUsername(state, value) {
      state.auth.username = value;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.auth.isLoggedIn;
    },
    getUsername(state) {
      return state.auth.username;
    }
  }
}
  