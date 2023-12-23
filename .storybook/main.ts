const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {
      fastRefresh: true,
    },
  },

  staticDirs: ["../public"],

  env: (config) => ({
    ...config,
    // ensure that new next/link is enabled in storybook
    // required for sidebar navigation stories
    __NEXT_NEW_LINK_BEHAVIOR: true,
  }),

  webpackFinal: async (config) => {
    config.resolve.alias["next/router"] = require.resolve(
      "../__mocks__/next/router.tsx",
    );
    config.resolve.alias["@api"] = path.resolve("./api");
    config.resolve.alias["@config"] = path.resolve("./config");
    config.resolve.alias["@features"] = path.resolve("./features");
    config.resolve.alias["@styles"] = path.resolve("./styles");
    config.resolve.alias["@typings"] = path.resolve("./typings");
    return config;
  },
};
