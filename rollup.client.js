import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/client.js',
  format: 'umd',
  plugins: [babel()],
  dest: 'dist/assets/app.js',
};
