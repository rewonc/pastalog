import React, { PropTypes } from 'react';

const Container = (props) => (
  props.data ? (<div>{JSON.stringify(props.data)}</div>) : (<div>No Data Yet</div>)
);

Container.propTypes = {
  data: PropTypes.object,
};

export default Container;
