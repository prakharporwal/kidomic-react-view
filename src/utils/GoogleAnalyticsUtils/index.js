export const ga4Utils = {
  push: (event) => {
    if (window && window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(event);
    } else {
      console.error("gtm script did not get injected dataLayer is empty");
    }
  },
};