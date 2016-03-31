import React from 'react';
import Interface from './Interface';

const Container = (props) => (
  /* This class instantiates the headers and grid.*/
  <div className="Container">
    <div className="clearfix">
      <h2 className="m0">pastalog</h2>
    </div>
    <Interface {...props} />
  </div>

);

export default Container;
