import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/server.js',
  format: 'cjs',
  plugins: [babel()],
  dest: 'dist/server.js',
};
