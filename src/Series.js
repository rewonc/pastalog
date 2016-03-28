import React, { PropTypes } from 'react';

class Series extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = '';
    }
    shouldComponentUpdate(nextProps) {
      return nextProps.indices === this.props.indices;
    }
    render() {
        return <div>{JSON.stringify(this.props.values)} <br />{JSON.stringify(this.props.indices)}</div>;
    }
}

// Series.propTypes = {
//   logs: PropTypes.object,
// };

export default Series;
