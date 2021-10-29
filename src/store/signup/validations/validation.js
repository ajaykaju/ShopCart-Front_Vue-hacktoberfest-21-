import validator from "validator";

export default {
  validation({ commit, getters }, payload) {
    const el = payload.target;
    if (el.id === "fname") {
      if (
        !getters.fname.trim().length ||
        getters.fname.length < 3 ||
        getters.fname.length > 21
      ) {
        commit("fnameClassChanger", { fnameClass: "inputErrorWrap" });
        commit("fnameValidChanger", { fnameValid: false });
      } else {
        commit("fnameClassChanger", { fnameClass: "inputValidWrap" });
        commit("fnameValidChanger", { fnameValid: true });
      }
    }
    if (el.id === "lname") {
      if (!getters.lname.trim().length || getters.lname.length > 21) {
        commit("lnameClassChanger", { lnameClass: "inputErrorWrap" });
        commit("lnameValidChanger", { lnameValid: false });
      } else {
        commit("lnameClassChanger", { lnameClass: "inputValidWrap" });
        commit("lnameValidChanger", { lnameValid: true });
      }
    }
    if (el.id === "email") {
      if (!validator.isEmail(getters.email)) {
        commit("emailClassChanger", { emailClass: "inputErrorWrap" });
        commit("emailValidChanger", { emailValid: false });
      } else {
        commit("emailClassChanger", { emailClass: "inputValidWrap" });
        commit("emailValidChanger", { emailValid: true });
      }
    }
    if (el.id === "dob") {
      const is18 = (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      if (
        validator.isDate(getters.dob, {
          format: "YYYY-MM-DD",
          delimiters: ["-"],
        })
      ) {
        if (is18(getters.dob) >= 18) {
          commit("dobClassChanger", { dobClass: "inputValidWrap" });
          commit("dobValidChanger", { dobValid: true });
        } else {
          commit("dobClassChanger", { dobClass: "inputErrorWrap" });
          commit("dobValidChanger", { dobValid: false });
        }
      } else {
        commit("dobClassChanger", { dobClass: "inputErrorWrap" });
        commit("dobValidChanger", { dobValid: false });
      }
    }
    if (el.id === "phoneNumber") {
      if (!validator.isMobilePhone(getters.phoneNumber)) {
        commit("phoneNumberClassChanger", {
          phoneNumberClass: "inputErrorWrap",
        });
        commit("phoneNumberValidChanger", { phoneNumberValid: false });
      } else {
        commit("phoneNumberClassChanger", {
          phoneNumberClass: "inputValidWrap",
        });
        commit("phoneNumberValidChanger", { phoneNumberValid: true });
      }
    }
    if (el.id === "password") {
      if (!validator.isStrongPassword(getters.password)) {
        commit("passwordClassChanger", { passwordClass: "inputErrorWrap" });
        commit("passwordValidChanger", { passwordValid: false });
      } else {
        commit("passwordClassChanger", {
          passwordClass: "inputValidWrap",
        });
        commit("passwordValidChanger", { passwordValid: true });
      }
    }
  },
};
