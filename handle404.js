window.onload = function () {
  const destination = window.location.href;
  if (destination.includes("nerdle") || destination.includes("hurdle")) {
    const redirectLocation = "https://hurdle.iancanderson.com";
    window.location.href = redirectLocation;
  }
};
