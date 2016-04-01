import React from 'react';
import Grid from './Grid';
import Legend from './Legend';

function Interface(props) {
  return (
  <div className="Interface max clearfix">
    <Grid {...props} />
    <Legend {...props} />

  </div>
 );
}


export default Interface;
