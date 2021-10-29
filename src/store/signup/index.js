import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      fname: "",
      lname: "",
      email: "",
      dob: "",
      phoneNumber: "",
      password: "",
      fnameClass: "inputNormalWrap",
      lnameClass: "inputNormalWrap",
      emailClass: "inputNormalWrap",
      dobClass: "inputNormalWrap",
      phoneNumberClass: "inputNormalWrap",
      passwordClass: "inputNormalWrap",
      fnameValid: false,
      lnameValid: false,
      emailValid: false,
      dobValid: false,
      phoneNumberValid: false,
      passwordValid: false,
      error: "",
    };
  },
  mutations,
  actions,
  getters,
};
