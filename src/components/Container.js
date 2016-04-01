import React from 'react';
import Interface from './Interface';

const Container = (props) => (
  /* This class instantiates the headers and grid.*/
  <div className="Container max">
    <div className="clearfix Header">
      <h2 className="m0 ml3 brand">
        <a href="https://github.com/rewonc/pastalog" target="_blank">
          pastalog
        </a>
      </h2>
    </div>
    <Interface {...props} />
  </div>

);

export default Container;
