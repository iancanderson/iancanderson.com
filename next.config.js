const isProd = process.env.CI === "true";

module.exports = {
  assetPrefix: isProd ? "/iancanderson.com/" : "",
  basePath: isProd ? "/iancanderson.com" : "",
  images: {
    loader: "custom",
  },
};
