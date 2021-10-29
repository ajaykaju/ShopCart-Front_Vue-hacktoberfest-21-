import normalToActive from "./validations/normalToActive";
import inputingvalidation from "./validations/inputingvalidation";
import validation from "./validations/validation";

export default {
  fnameChanger(context, payload) {
    context.commit("fnameChanger", payload);
  },
  lnameChanger(context, payload) {
    context.commit("lnameChanger", payload);
  },
  emailChanger(context, payload) {
    context.commit("emailChanger", payload);
  },
  dobChanger(context, payload) {
    context.commit("dobChanger", payload);
  },
  phoneNumberChanger(context, payload) {
    context.commit("phoneNumberChanger", payload);
  },
  passwordChanger(context, payload) {
    context.commit("passwordChanger", payload);
  },
  fnameClassChanger(context, payload) {
    context.commit("fnameClassChanger", payload);
  },
  lnameClassChanger(context, payload) {
    context.commit("lnameClassChanger", payload);
  },
  emailClassChanger(context, payload) {
    context.commit("emailClassChanger", payload);
  },
  dobClassChanger(context, payload) {
    context.commit("dobClassChanger", payload);
  },
  phoneNumberClassChanger(context, payload) {
    context.commit("phoneNumberClassChanger", payload);
  },
  passwordClassChanger(context, payload) {
    context.commit("passwordClassChanger", payload);
  },
  fnameValidChanger(context, payload) {
    context.commit("fnameValidChanger", payload);
  },
  lnameValidChanger(context, payload) {
    context.commit("lnameValidChanger", payload);
  },
  emailValidChanger(context, payload) {
    context.commit("emailValidChanger", payload);
  },
  dobValidChanger(context, payload) {
    context.commit("dobValidChanger", payload);
  },
  phoneNumberValidChanger(context, payload) {
    context.commit("phoneNumberValidChanger", payload);
  },
  passwordValidChanger(context, payload) {
    context.commit("passwordValidChanger", payload);
  },
  errorChanger(context, payload) {
    context.commit("errorChanger", payload);
  },

  //to clear all values

  valueChangerAll(context) {
    context.commit("valueChangerAll");
  },

  ...normalToActive,
  ...inputingvalidation,
  ...validation,
};
