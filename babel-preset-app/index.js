// eslint-disable-next-line no-unused-vars
module.exports = (api, opts = {}) => ({
    // Run in reverse order
    presets: [],
    // Run in normal order
    plugins: [
      'babel-plugin-lodash',
      'syntax-class-properties',
      'syntax-dynamic-import',
      [
        'transform-builtin-extend',
        {
          globals: ['Error', 'Array'],
        },
      ],
      'transform-class-properties',
      'transform-export-extensions',
      'transform-flow-strip-types',
      'transform-object-rest-spread',
    ],
  });
  