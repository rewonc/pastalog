import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/client.js',
  format: 'iife',
  globals: {
    'socket.io': 'io',
  },
  plugins: [babel()],
  dest: 'dist/assets/app.js',
};
