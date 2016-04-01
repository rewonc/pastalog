import React from 'react';
import Grid from './Grid';
import Legend from './Legend';

const Interface = (props) => (
  <div className="Interface">
    <Grid {...props} />
    <Legend {...props} />

  </div>

);

export default Interface;
