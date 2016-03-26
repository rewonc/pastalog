import React from 'react';
import Container from './Container';

const App = () => (
  <html>
    <head>
      <title>pastalog ~~~~~~~</title>
      <script src="/socket.io/socket.io.js" defer></script>
      <script src='/app.js' defer></script>
    </head>
    <body id="container">
      <Container />
    </body>
  </html>
);

export default App;
