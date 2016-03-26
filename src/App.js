import React from 'react';
import Container from './Container';

const App = () => (
  <html>
    <head>
      <title>pastalog ~~~~~~~</title>
    </head>
    <body id="container">
      <Container />
    </body>
    <script src="/socket.io/socket.io.js"></script>
    <link href="https://npmcdn.com/basscss@8.0.1/css/basscss.min.css" rel="stylesheet" />
    <script src='/app.js'></script>
  </html>
);

export default App;
