// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*', // Reemplaza con la URL de tu API FastAPI
      },
    ];
  },
};