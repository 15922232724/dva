// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://47.92.235.51:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }),
  );
};
