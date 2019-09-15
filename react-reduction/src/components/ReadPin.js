import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const ReadPin = ({chip, pin, render, freq }) => {
  
  let [node, setNode] = useState(null)

  useEffect(() => {
    let id = setInterval(async () => {
      setNode(render(await chip.readPin(pin)))
    }, 1000/freq)

    return () => {
      clearInterval(id)
    }
  })

  return node || <Spinner size='sm'/>
};

ReadPin.propTypes = {
  pin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  render: PropTypes.func.isRequired,
  freq: PropTypes.number
};

ReadPin.defaultProps = {
  freq: 1
};

export default React.memo(ReadPin);
