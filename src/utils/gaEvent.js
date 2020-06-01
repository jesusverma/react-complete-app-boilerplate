import { penguinGA } from "utils/ga";

function createLabels(mod, subMod, action) {
  return ["init", "success", "fail"].reduce((acc, type) => {
    acc[type] = createEvent(mod, subMod, action, type);
    return acc;
  }, {});
}

function createEvent(mod, subMod, action, type = "") {
  return () =>
    penguinGA.trackEvent(
      mod.replace(/_/g, " "),
      `${subMod}_${action}_${type}`,
      `${mod}.${subMod}.${action}_${type}`
    );
}

export default {
  signIn: {
    login: createLabels("web_app", "sign_in", "singIn"),
    facebook_login: createLabels("web_app", "sign_in", "facebook_login"),
    google_login: createLabels("web_app", "sign_in", "google_login"),
  },
};
