import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {FaPlug} from 'react-icons/fa';

let regex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

const IPAddressInput = () => {

  let initial = localStorage.getItem('chip-ip')
  const [value, setValue] = useState(initial || '');

  let valid = regex.test(value)

  return (
    <InputGroup className={!valid && 'blink-alert-glow' || ''}>
      <Input
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Enter Chip's IP Address"
        onBlur={event => valid && localStorage.setItem('chip-ip', value)}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <FaPlug/>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
};

IPAddressInput.propTypes = {

};

IPAddressInput.defaultProps = {

};

export default IPAddressInput;
