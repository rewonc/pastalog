import React from 'react';
import Grid from './Grid';

const Container = (props) => (
  /* This class instantiates the headers and grid.*/
  <div>
    <h2 className="m0">pastalog</h2>
    <Grid {...props} />
  </div>

);

export default Container;
