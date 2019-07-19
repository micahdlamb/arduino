import React from 'react';
import Page from 'components/Page';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import PinValues from 'components/PinValues';

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
          <PinValues title="Temperature" datasets={temperatureCurves} options={options} history={3} freq={3}/>
        </Col>
        <Col xl={6} lg={12} md={12}>
          <PinValues title="Pressure" datasets={pressureCurves} options={options} freq={1}/>
        </Col>
      </Row>
    </Page>
  );
};

export default ChillersPage;
