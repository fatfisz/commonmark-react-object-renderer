import babel from 'rollup-plugin-babel';


const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        ['env', {
          targets: {
            node: 6,
          },
          loose: true,
          modules: false,
        }],
      ],
    }),
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'cjs',
    },
  ],
  interop: false,
};
