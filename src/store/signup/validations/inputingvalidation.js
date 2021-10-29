export default {
  inputingvalidation({ dispatch, getters }, payload) {
    const el = payload.target;

    if (el.id === "fname") {
      if (
        getters.fnameClass === "inputErrorWrap" ||
        getters.fnameClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
    if (el.id === "lname") {
      if (
        getters.lnameClass === "inputErrorWrap" ||
        getters.lnameClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
    if (el.id === "email") {
      if (
        getters.emailClass === "inputErrorWrap" ||
        getters.emailClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
    if (el.id === "dob") {
      if (
        getters.dobClass === "inputErrorWrap" ||
        getters.dobClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
    if (el.id === "phoneNumber") {
      if (
        getters.phoneNumberClass === "inputErrorWrap" ||
        getters.phoneNumberClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
    if (el.id === "password") {
      if (
        getters.passwordClass === "inputErrorWrap" ||
        getters.passwordClass === "inputValidWrap"
      )
        dispatch("validation", payload);
    }
  },
};
