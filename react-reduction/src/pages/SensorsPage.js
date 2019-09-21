import React from 'react';
import Page from 'components/Page';
import * as rs from 'reactstrap';
import * as fa from 'react-icons/fa';
// import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import ReadPin from 'components/ReadPin';
import TogglePin from 'components/TogglePin';
import { connect } from 'react-redux';
import {notify} from 'store';
import {chiller1, chiller2} from 'chips';
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
    return <span className={alert && 'warn-text'}>{value.toFixed(1)}° F</span>
  }

  return (
    <rs.Card>
      <rs.CardHeader>
        <h3 className="d-none d-sm-block">{chip.label}</h3>
        <h3 className="d-sm-none"><fa.FaRobot/></h3>
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
        <TogglePin chip={chip} pin={6} />
      </rs.CardHeader>
      <rs.CardBody className='text-center text-nowrap' style={{fontSize: '10vw'}}>
        <ReadPin chip={chip} pin={pin} render={temperature}/>
      </rs.CardBody>
    </rs.Card>
  )
}

TemperatureCard = connect(({settings}) => ({maxTemp: settings.maxTemp}), { notify })(TemperatureCard)