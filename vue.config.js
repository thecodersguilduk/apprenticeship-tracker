// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer: {
    host: 'localhost', // Set to 'localhost' or your specific IP
    port: 8080, // Ensure this matches the port you're trying to access
    hot: true, // Enable hot module replacement (HMR)
    open: true, // Automatically open the browser after starting the server
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
