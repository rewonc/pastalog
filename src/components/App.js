const App = (child) =>
  `<!DOCTYPE html>
  <html>
    <head>
      <title>pastalog ~~~~~~~</title>
      <script src='app.js' defer></script>
    </head>
    <body>
      <div id="container" class="max">${child}</div>
    </body>
  </html>`;

export default App;
