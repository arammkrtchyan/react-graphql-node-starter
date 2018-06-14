module.exports = {
  presets: ["app-node"],
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
