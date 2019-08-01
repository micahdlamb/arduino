import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import * as chip from 'chip';

const ReadPinValue = ({pin, render, freq }) => {
  
  let [node, setNode] = useState(null)

  useEffect(() => {
    let id = setInterval(async () => {
      setNode(render(await chip.readPin(pin)))
    }, 1000/freq)

    return () => {
      clearInterval(id)
    }
  }, [freq])

  return node || <Spinner size='sm'/>
};

ReadPinValue.propTypes = {
  pin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  render: PropTypes.func.isRequired,
  freq: PropTypes.number
};

ReadPinValue.defaultProps = {
  freq: 1
};

export default React.memo(ReadPinValue);
