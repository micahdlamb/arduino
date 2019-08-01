import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { connect } from 'react-redux';
import * as fa from 'react-icons/fa';
import * as md from 'react-icons/md';

let regex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

const IPAddressInput = ({connected}) => {

  let initial = localStorage.getItem('chip-ip')
  const [value, setValue] = useState(initial || '');

  let valid = regex.test(value)

  let icon = connected === null ? <fa.FaPlug/> : (connected ? <md.MdSignalWifi4Bar/> : <md.MdSignalWifiOff/>)

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
          {icon}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
};

IPAddressInput.propTypes = {

};

IPAddressInput.defaultProps = {

};

export default connect(({connected}) => ({connected}))(IPAddressInput);