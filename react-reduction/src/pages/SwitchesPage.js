import React, {useState} from 'react';
import Page from 'components/Page';
import * as rs from 'reactstrap';
// import * as fa from 'react-icons/fa';
// import { getColor } from 'utils/colors';
// import hotIcon from 'assets/img/hot.png';
// import ReadPin from 'components/ReadPin';
import ToggleButton from 'react-toggle-button'
import { connect } from 'react-redux';
import {notify} from 'actions';
import TogglePin from 'components/TogglePin';
import EditPin from 'components/EditPin';
import {chiller1} from 'chips';


const SwitchesPage = ({notify}) => {
  
  let [auto, setAuto] = useState(false)

  return (
    <Page title="Switches">
      <rs.Card>
        <rs.CardHeader>
          {auto ? 'Auto' : 'Manual'}
          <ToggleButton value={auto} onToggle={() => setAuto(!auto)}/>
        </rs.CardHeader>
        <rs.CardBody>
          <rs.Row>
            <rs.Col md={6}>
              <rs.Card>
                <rs.CardHeader>
                  Inputs
                </rs.CardHeader>
                <rs.CardBody>
                  <rs.FormGroup>
                    <rs.Label>RPM</rs.Label>
                    <EditPin chip={chiller1} pin={10}/>
                  </rs.FormGroup>
                  <rs.FormGroup>
                    <rs.Label>Voltage</rs.Label>
                    <EditPin chip={chiller1} pin={10} type='slider'/>
                  </rs.FormGroup>
                </rs.CardBody>
              </rs.Card>
            </rs.Col>
            <rs.Col md={6}>
              <rs.Card>
                <rs.CardHeader>
                  Switches
                </rs.CardHeader>
                <rs.CardBody className='switches'>
                  <rs.Row>
                    <rs.Col sm={6}>Pin 1 <TogglePin chip={chiller1} pin={1} /></rs.Col>
                    <rs.Col sm={6}>Pin 2 <TogglePin chip={chiller1} pin={2} /></rs.Col>
                    <rs.Col sm={6}>Pin 3 <TogglePin chip={chiller1} pin={3} /></rs.Col>
                    <rs.Col sm={6}>Pin 4 <TogglePin chip={chiller1} pin={4} /></rs.Col>
                    <rs.Col sm={6}>Pin 5 <TogglePin chip={chiller1} pin={5} /></rs.Col>
                    <rs.Col sm={6}>Pin 6 <TogglePin chip={chiller1} pin={6} /></rs.Col>
                    <rs.Col sm={6}>Pin 7 <TogglePin chip={chiller1} pin={7} /></rs.Col>
                    <rs.Col sm={6}>Pin 8 <TogglePin chip={chiller1} pin={8} /></rs.Col>
                  </rs.Row>
                </rs.CardBody>
              </rs.Card>
            </rs.Col>
          </rs.Row>
        </rs.CardBody>
      </rs.Card>
    </Page>
  );
};


export default connect(() => ({}), { notify })(SwitchesPage);
