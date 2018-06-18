module.exports = {
  presets: ["app-web"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          app: "./app"
        }
      }
    ]
  ]
};
