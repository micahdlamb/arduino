import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as chip from 'chip';

const ReadPinValue = ({pin, render, freq }) => {

  const [value, setValue] = useState(0);

  useEffect(() => {
    let id = setInterval(async () => {
      setValue(await chip.readPin(pin))
    }, 1000/freq)

    return () => {
      clearInterval(id)
    }
  }, [freq])

  return render(value)
};

ReadPinValue.propTypes = {
  pin: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  freq: PropTypes.number
};

ReadPinValue.defaultProps = {
  freq: 1
};

export default React.memo(ReadPinValue);
