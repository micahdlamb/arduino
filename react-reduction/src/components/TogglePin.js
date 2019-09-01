import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button'

const TogglePin = ({ chip, pin }) => {
  
    let [value, setValue] = useState(false)
    let toggleValue = async () => {
      chip.writePin(chip, pin, value ? 0 : 1)
      setValue(!value)
    }

    useEffect(() => {
        async function componentDidMount(){
          let value = await chip.readPin(pin)
          setValue(value)
        }
        componentDidMount()
    }, [])

    return <ToggleButton value={value} onToggle={toggleValue}/>
};

TogglePin.propTypes = {
  pin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TogglePin.defaultProps = {

};

export default React.memo(TogglePin);
