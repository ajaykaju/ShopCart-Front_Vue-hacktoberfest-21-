import axios from "axios";
import router from "../../router/index";

export default {
  userChanger(context, payload) {
    context.commit("userChanger", payload);
  },

  isLoggedInChanger(context, payload) {
    context.commit("isLoggedInChanger", payload);
  },

  authTokenChanger(context, payload) {
    context.commit("authTokenChanger", payload);
  },

  errorChanger(context, payload) {
    context.commit("errorChanger", payload);
  },

  async userSetter({ dispatch }, payload) {
    await dispatch("userChanger", payload.userChange);
    await dispatch("isLoggedInChanger", payload.isLoggedInChange);
  },

  //logIn
  async logIn({ dispatch }, payload) {
    await axios
      .post(
        `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/user/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      )
      .then(async (res) => {
        document.cookie = `Authorization=Bearer ${res.data.token}`;
        await dispatch("authTokenFetcher");
        await dispatch("userSetter", {
          userChange: { user: res.data.user },
          isLoggedInChange: { isLoggedIn: true },
        });
        router.push({ path: "/" });
      })
      .catch(() => {
        dispatch("errorChanger", {
          error: "An error occured. Please try again later",
        });
        setTimeout(() => {
          dispatch("errorChanger", {
            error: "",
          });
        }, 3000);
      });
  },

  //autoLogin
  async autoLogin({ dispatch, getters }) {
    await dispatch("authTokenFetcher");

    if (getters.authToken) {
      axios
        .get(`${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/user/me`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: getters.authToken,
          },
        })
        .then(async (res) => {
          await dispatch("userSetter", {
            userChange: { user: res.data },
            isLoggedInChange: { isLoggedIn: true },
          });
        })
        .catch(() => {
          console.log();
        });
    }
  },

  //signOut
  async signOut({ dispatch, getters }) {
    if (getters.authToken) {
      await axios
        .post(
          `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/user/logout`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              Authorization: getters.authToken,
            },
          }
        )
        .then(async () => {
          await dispatch("userSetter", {
            userChange: { user: {} },
            isLoggedInChange: { isLoggedIn: false },
          });
          document.cookie = `Authorization=`;
          await dispatch("authTokenFetcher");
        })
        .catch();
    }
  },

  //authTokenFetcher
  async authTokenFetcher({ dispatch }) {
    const authHeader = decodeURIComponent(document.cookie)
      .split(";")
      .filter((item) => item.indexOf("Authorization=") >= 0);

    if (authHeader.length) {
      const token = authHeader[0].replace("Authorization=", "");
      await dispatch("authTokenChanger", { authToken: token });
    } else {
      await dispatch("authTokenChanger", { authToken: "" });
    }
  },
};
