import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

const EditPin = ({ chip, pin, type, addon, ...rest }) => {
  
  let [value, setValue] = useState(undefined)

  useEffect(() => {
    async function componentDidMount(){
      let value = await chip.readPin(pin)
      setValue(value)
    }
    componentDidMount()
  }, [])

  let timeout
  let handleChange = value => {
    setValue(value)
    clearTimeout(timeout)
    timeout = setTimeout(() => chip.writePin(pin, value), 250)
  }

  if (value === undefined)
    return <rs.Spinner/>

    console.log(value)
  return (
    type === 'slider' ?
      <Slider value={value} onChange={handleChange} {...rest}/>
    :
      <rs.InputGroup>
        <rs.Input
          type={type}
          value={value}
          onChange={event => handleChange(event.target.value)}
          {...rest}
        />
        {addon &&
          <rs.InputGroupAddon addonType="append">
            <rs.InputGroupText>
              {addon}
            </rs.InputGroupText>
          </rs.InputGroupAddon>
        }
      </rs.InputGroup>
  )
};

EditPin.propTypes = {
  pin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  addon: PropTypes.node,
};

EditPin.defaultProps = {
  type: 'number'
};

export default React.memo(EditPin);
