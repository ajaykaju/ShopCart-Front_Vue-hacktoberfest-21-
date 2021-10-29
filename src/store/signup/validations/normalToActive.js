export default {
  normalToActive({ commit, getters }, payload) {
    const el = payload.target;

    if (el.id === "fname") {
      if (getters.fnameClass === "inputNormalWrap")
        commit("fnameClassChanger", { fnameClass: "inputActiveWrap" });
    }
    if (el.id === "lname") {
      if (getters.lnameClass === "inputNormalWrap")
        commit("lnameClassChanger", { lnameClass: "inputActiveWrap" });
    }
    if (el.id === "email") {
      if (getters.emailClass === "inputNormalWrap")
        commit("emailClassChanger", { emailClass: "inputActiveWrap" });
    }
    if (el.id === "dob") {
      if (getters.dobClass === "inputNormalWrap")
        commit("dobClassChanger", { dobClass: "inputActiveWrap" });
    }
    if (el.id === "phoneNumber") {
      if (getters.phoneNumberClass === "inputNormalWrap")
        commit("phoneNumberClassChanger", {
          phoneNumberClass: "inputActiveWrap",
        });
    }
    if (el.id === "password") {
      if (getters.passwordClass === "inputNormalWrap")
        commit("passwordClassChanger", {
          passwordClass: "inputActiveWrap",
        });
    }
  },
};
