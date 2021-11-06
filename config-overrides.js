const {
  useBabelRc,
  removeModuleScopePlugin,
  override,
  addWebpackPlugin,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  removeModuleScopePlugin(),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
);
