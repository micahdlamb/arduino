import React from 'react';
import Page from 'components/Page';
import * as rs from 'reactstrap';
import * as fa from 'react-icons/fa';
// import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import pressureIcon from 'assets/img/pressure.png'
import ReadPin from 'components/ReadPin';
import { connect } from 'react-redux';
import {notify} from 'store';
import {chiller1, chiller2, lp, hp} from 'chips';
import EditSetting from 'components/EditSetting';


export default function SensorsPage(){

  return (
    <Page title="Sensors">
      <rs.Row>
        <rs.Col xl={6} lg={6} md={12}>
          <TemperatureCard chip={chiller1} pin='T1'/>
        </rs.Col>
        <rs.Col xl={6} lg={6} md={12}>
          <TemperatureCard chip={chiller2} pin='T1'/>
        </rs.Col>
        <rs.Col xl={6} lg={6} md={12}>
          <PressureCard chip={lp} pin='1'/>
        </rs.Col>
        <rs.Col xl={6} lg={6} md={12}>
          <PressureCard chip={hp} pin='1'/>
        </rs.Col>
      </rs.Row>
    </Page>
  );
};


let TemperatureCard = ({notify, chip, pin, maxTemp}) => {
  let temperature = value => {
    if (maxTemp != null){
      var alert = value >= maxTemp || null
      if (alert)
        notify({
          avatar: hotIcon,
          message: `${chip.label} got hot`,
        })
    }
    return <span className={alert && 'warn-text'}>{value.toFixed(1)}° <small>F</small></span>
  }

  return (
    <rs.Card>
      <rs.CardHeader>
        <h3>{chip.label}</h3>
        {/* <h3 className="d-none d-sm-block">{chip.label}</h3>
        <h3 className="d-sm-none"><fa.FaRobot/></h3> */}
        <div>
          <rs.InputGroup>
            <EditSetting
              setting='maxTemp'
              type='number'
              placeholder="Max °F"
              style={{maxWidth: '10ch'}}
            />
            <rs.InputGroupAddon addonType="append">
              <rs.InputGroupText>
                <fa.FaFire/>
              </rs.InputGroupText>
            </rs.InputGroupAddon>
          </rs.InputGroup>
        </div>
      </rs.CardHeader>
      <rs.CardBody className='text-center text-nowrap' style={{fontSize: '10vw'}}>
        <ReadPin chip={chip} pin={pin} render={temperature}/>
      </rs.CardBody>
    </rs.Card>
  )
}

TemperatureCard = connect(({settings}) => ({maxTemp: settings.maxTemp}), { notify })(TemperatureCard)


let PressureCard = ({notify, chip, pin, maxPressure}) => {
  let pressure = value => {
    if (maxPressure != null){
      var alert = value >= maxPressure || null
      if (alert)
        notify({
          avatar: pressureIcon,
          message: `${chip.label} got high`,
        })
    }
    return <span className={alert && 'warn-text'}>{value.toFixed(1)} <small>PSI</small></span>
  }

  return (
    <rs.Card>
      <rs.CardHeader>
        <h3>{chip.label}</h3>
        <div>
          <rs.InputGroup>
            <EditSetting
              setting='maxPressure'
              type='number'
              placeholder="Max PSI"
              style={{maxWidth: '11ch'}}
            />
            <rs.InputGroupAddon addonType="append">
              <rs.InputGroupText>
                <fa.FaWeight/>
              </rs.InputGroupText>
            </rs.InputGroupAddon>
          </rs.InputGroup>
        </div>
      </rs.CardHeader>
      <rs.CardBody className='text-center text-nowrap' style={{fontSize: '10vw'}}>
        <ReadPin chip={chip} pin={pin} render={pressure}/>
      </rs.CardBody>
    </rs.Card>
  )
}

PressureCard = connect(({settings}) => ({maxPressure: settings.maxPressure}), { notify })(PressureCard)