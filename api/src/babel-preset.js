module.exports = {
  presets: ["app-node"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          app: "./app"
        }
      }
    ]
  ]
};
