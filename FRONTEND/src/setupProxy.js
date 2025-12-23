const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7273',
      changeOrigin: true,
      secure: false, // Acepta certificados SSL autofirmados
    })
  );
};
