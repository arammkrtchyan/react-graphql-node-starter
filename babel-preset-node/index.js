module.exports = (api, opts = {}) => ({
  // Run in reverse order
  presets: [
    [
      "env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  // Run in normal order
  plugins: ["transform-async-to-bluebird", "transform-promise-to-bluebird"]
});
