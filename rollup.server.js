import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/server.js',
  format: 'umd',
  plugins: [babel()],
  dest: 'dist/server.js',
};
