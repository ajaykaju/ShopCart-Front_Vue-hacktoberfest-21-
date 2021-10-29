export default {
  fnameChanger(state, payload) {
    state.fname = payload.fname;
  },
  lnameChanger(state, payload) {
    state.lname = payload.lname;
  },
  emailChanger(state, payload) {
    state.email = payload.email;
  },
  dobChanger(state, payload) {
    state.dob = payload.dob;
  },
  phoneNumberChanger(state, payload) {
    state.phoneNumber = payload.phoneNumber;
  },
  passwordChanger(state, payload) {
    state.password = payload.password;
  },
  fnameClassChanger(state, payload) {
    state.fnameClass = payload.fnameClass;
  },
  lnameClassChanger(state, payload) {
    state.lnameClass = payload.lnameClass;
  },
  emailClassChanger(state, payload) {
    state.emailClass = payload.emailClass;
  },
  dobClassChanger(state, payload) {
    state.dobClass = payload.dobClass;
  },
  phoneNumberClassChanger(state, payload) {
    state.phoneNumberClass = payload.phoneNumberClass;
  },
  passwordClassChanger(state, payload) {
    state.passwordClass = payload.passwordClass;
  },
  fnameValidChanger(state, payload) {
    state.fnameValid = payload.fnameValid;
  },
  lnameValidChanger(state, payload) {
    state.lnameValid = payload.lnameValid;
  },
  emailValidChanger(state, payload) {
    state.emailValid = payload.emailValid;
  },
  dobValidChanger(state, payload) {
    state.dobValid = payload.dobValid;
  },
  phoneNumberValidChanger(state, payload) {
    state.phoneNumberValid = payload.phoneNumberValid;
  },
  passwordValidChanger(state, payload) {
    state.passwordValid = payload.passwordValid;
  },
  errorChanger(state, payload) {
    state.error = payload.error;
  },

  //to clear all auth values
  valueChangerAll(state) {
    state.fname = state.lname = state.email = state.dob = state.phoneNumber = state.password = state.error =
      "";
    state.fnameClass = state.lnameClass = state.emailClass = state.dobClass = state.phoneNumberClass = state.passwordClass =
      "inputNormalWrap";
    state.fnameValid = state.lnameValid = state.emailValid = state.dobValid = state.phoneNumberValid = state.passwordValid = false;
  },
};
