import ReactGA from "react-ga";

class PenguinGA {
  constructor() {
    this.GA_ID = process.env.GA_TRACKING_ID;
  }

  initializeGa = async () => {
    try {
      const GA = await ReactGA.initialize("UA-167960986-1");
      // const GA = await ReactGA.initialize("UA-164983165-1");
      console.log("initializeGa successfully", GA);
    } catch (error) {
      console.log("initializeGa error", error);
    }
  };

  trackPage = async () => {
    try {
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log("initializeGa successfully");
    } catch (error) {
      console.log("initializeGa error", error);
    }
  };

  trackEvent = (category, action, label, value) => {
    try {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
    } catch (err) {
      console.log("GA Failed to Track");
    }
  };
}

export const penguinGA = new PenguinGA();
