import React from 'react';
import Grid from './Grid';

const Container = (props) => (
  /* This class instantiates the headers and grid.*/
  <div>
    <div className="header">pastalog</div>
    <Grid {...props} />
  </div>

);

export default Container;
