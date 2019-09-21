import React from 'react';
import * as rs from 'reactstrap';
import { connect } from 'react-redux';
import {setSettings} from 'store';

const EditSetting = ({ setting, value, setSettings, ...rest }) => {

  function handleChange(event){
    let input = event.target
    let value = input.valueAsNumber != null ? input.valueAsNumber : input.value
    if (isNaN(value)) value = null
    setSettings({[setting]: value})
  }

  return <rs.Input value={value != null ? value : ''} onChange={handleChange} {...rest}/>
};

export default connect(({settings}, {setting}) => ({value: settings[setting]}), {setSettings})(EditSetting)
