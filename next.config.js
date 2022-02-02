const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/iancanderson.com/" : "",
  basePath: isProd ? "/iancanderson.com" : "",
};
