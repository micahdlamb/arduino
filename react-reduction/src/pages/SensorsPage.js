import React from 'react';
import Page from 'components/Page';
import { Row, Col, Card, CardHeader, CardBody, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import * as fa from 'react-icons/fa';
// import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import ReadPin from 'components/ReadPin';
import TogglePin from 'components/TogglePin';
import { connect } from 'react-redux';
import {notify, setSettings} from 'store';
import {chiller1, chiller2} from 'chips';


export default function SensorsPage(){

  return (
    <Page title="Sensors">
      <Row>
        <Col xl={6} lg={6} md={12}>
          <TemperatureCard chip={chiller1} pin='T1'/>
        </Col>
        <Col xl={6} lg={6} md={12}>
          <TemperatureCard chip={chiller2} pin='T1'/>
        </Col>
      </Row>
    </Page>
  );
};


let TemperatureCard = ({notify, chip, pin, maxTemp, setSettings}) => {
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
    <Card>
      <CardHeader>
        <h3 className="d-none d-sm-block">{chip.label}</h3>
        <h3 className="d-sm-none"><fa.FaRobot/></h3>
        <div>
          <InputGroup>
            <Input
              type='number'
              value={maxTemp != null ? maxTemp : ''}
              onChange={event => setSettings({maxTemp: event.target.value})}
              placeholder="Max °F"
              style={{maxWidth: '10ch'}}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <fa.FaFire/>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <TogglePin chip={chip} pin={6} />
      </CardHeader>
      <CardBody className='text-center text-nowrap' style={{fontSize: '10vw'}}>
        <ReadPin chip={chip} pin={pin} render={temperature}/>
      </CardBody>
    </Card>
  )
}

TemperatureCard = connect(({settings}) => ({maxTemp: settings.maxTemp}), { notify, setSettings })(TemperatureCard)