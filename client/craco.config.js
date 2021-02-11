const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ff5c00',
              '@link-color': '#ff5c00',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
