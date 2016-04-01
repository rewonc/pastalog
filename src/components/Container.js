import React from 'react';
import Interface from './Interface';

const Container = (props) => (
  /* This class instantiates the headers and grid.*/
  <div className="Container max">
    <div className="clearfix Header">
      <h3 className="m0 ml3 mt1 brand">
        <a href="https://github.com/rewonc/pastalog" target="_blank">
          pastalog
        </a>
      </h3>
    </div>
    <Interface {...props} />
  </div>

);

export default Container;
