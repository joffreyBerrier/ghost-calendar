/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const extraNodeModules = {
  core: path.resolve("../../core"),
};
const watchFolders = [
  path.resolve("../../core"),
  path.resolve("../../node_modules"),
];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
  },
  watchFolders,
};
