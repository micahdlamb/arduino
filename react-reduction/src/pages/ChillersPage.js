import React from 'react';
import Page from 'components/Page';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import PinValuesChart from 'components/PinValuesChart';
import ReadPinValue from 'components/ReadPinValue';

let options = {
  scales: {
    xAxes: [{
        type: 'time',
        ticks: {
          display: false
        }
    }]
  }
}

let temperatureCurves = [
  {
    label: 'Chiller 1',
    pin: 1,
    backgroundColor: getColor('primary'),
    borderColor: getColor('primary'),
    borderWidth: 2,
    fill: false
  },
  {
    label: 'Chiller 2',
    pin: 2,
    backgroundColor: getColor('secondary'),
    borderColor: getColor('secondary'),
    borderWidth: 2,
    fill: false
  }
]

let pressureCurves = [
  {
    label: 'Chiller 1',
    pin: 3,
    backgroundColor: getColor('primary'),
    borderColor: getColor('primary'),
    borderWidth: 2,
    fill: false
  },
  {
    label: 'Chiller 2',
    pin: 4,
    backgroundColor: getColor('secondary'),
    borderColor: getColor('secondary'),
    borderWidth: 2,
    fill: false
  }
]

const ChillersPage = () => {
  return (
    <Page title="Chillers">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <PinValuesChart title={<ReadPinValue pin={1} render={temperature}/>} datasets={temperatureCurves} options={options} freq={1}/>
        </Col>
        <Col xl={6} lg={12} md={12}>
          <PinValuesChart title="Pressure" datasets={pressureCurves} options={options} freq={1}/>
        </Col>
      </Row>
    </Page>
  );
};

function temperature(value){
  let alert = value > .5
  return <span className={alert && 'blink-alert' || null}>Temperature <strong>{value}</strong> °C</span>
}

export default ChillersPage;
