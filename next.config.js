module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) })
    );

    return config;
  }
};
