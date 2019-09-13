import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as rs from 'reactstrap';
import * as fa from 'react-icons/fa';
import * as md from 'react-icons/md';

import * as _chips from 'chips';
let chips = Object.values(_chips)

function ChipIps({connected, size, dispatch, ...rest}){

  let [show, setShow] = useState(false)
  let toggle = () => setShow(!show)

  let anyConnected    = chips.some(chip => connected[chip.name])
  let anyDisconnected = chips.some(chip => connected[chip.name] === false)
  let Icon = anyDisconnected ? md.MdSignalWifiOff : (
    anyConnected ? md.MdSignalWifi4Bar : fa.FaPlug
  )

  return <>
    <rs.Button onClick={toggle} {...rest}>
      <Icon size={size}/>
    </rs.Button>
    <rs.Modal isOpen={show} toggle={toggle}>
      <rs.ModalHeader toggle={toggle}>
        Chip IP Addresses
      </rs.ModalHeader>
      <rs.ModalBody>
        <rs.Form>
          {chips.map(chip =>
            <rs.FormGroup key={chip.name}>
              <rs.Label>{chip.label}</rs.Label>
              <IpAddressInput chip={chip}/>
            </rs.FormGroup>
          )}
        </rs.Form>
      </rs.ModalBody>
    </rs.Modal>
  </>
}

export default connect(({connected}) => ({connected}))(ChipIps);

const IpAddressInput = ({chip, connected}) => {

  const [value, setValue] = useState(chip.getIp() || '');

  let regex = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(:[0-9]{1,5})?$/
  let valid = regex.test(value)

  return (
    <rs.InputGroup>
      <rs.Input
        value={value}
        onChange={event => setValue(event.target.value)}
        onBlur={event => (valid || !value) && chip.setIp(value)}
        valid={valid}
        invalid={!!value && !valid}
      />
      <rs.InputGroupAddon addonType="append">
        <rs.InputGroupText>
          <WifiStatusIcon chip={chip}/>
        </rs.InputGroupText>
      </rs.InputGroupAddon>
    </rs.InputGroup>
  )
};


export const WifiStatusIcon = connect(({connected}, {chip}) => ({connected: connected[chip.name]}))(({connected}) => (
  connected === undefined ? <fa.FaPlug/> : (
    connected ?
      <md.MdSignalWifi4Bar/>
    : <md.MdSignalWifiOff/>
  )
))