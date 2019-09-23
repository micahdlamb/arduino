import React from 'react';
import Page from 'components/Page';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import ChartPins from 'components/ChartPins';
import ReadPin from 'components/ReadPin';
import {chiller1, chiller2} from 'chips';

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
    chip: chiller1,
    pin: 'T1',
    backgroundColor: getColor('primary'),
    borderColor: getColor('primary'),
    borderWidth: 2,
    fill: false
  },
  {
    label: 'Chiller 2',
    chip: chiller2,
    pin: 'T1',
    backgroundColor: getColor('secondary'),
    borderColor: getColor('secondary'),
    borderWidth: 2,
    fill: false
  },
]

let pressureCurves = [
  {
    label: 'Chiller 1',
    chip: chiller1,
    pin: 6,
    backgroundColor: getColor('primary'),
    borderColor: getColor('primary'),
    borderWidth: 2,
    fill: false
  },
  {
    label: 'Chiller 2',
    chip: chiller2,
    pin: 7,
    backgroundColor: getColor('secondary'),
    borderColor: getColor('secondary'),
    borderWidth: 2,
    fill: false
  },
]

export default function ChartsPage(){

  let temperature = value => <><strong>{value.toFixed(2)}</strong>° F</>
  let pressure    = value => <><strong>{value.toFixed(2)}</strong> PSI</>

  return (
    <Page title="Chiller 1">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <ChartPins
            title={<>Temperature <ReadPin chip={chiller1} pin={'T1'} render={temperature}/></>}
            datasets={temperatureCurves}
            options={options}
            freq={1}
          />
        </Col>
        <Col xl={6} lg={12} md={12}>
          <ChartPins
            title={<>Pressure <ReadPin chip={chiller1} pin={1} render={pressure}/></>}
            datasets={pressureCurves}
            options={options}
            freq={1}
          />
        </Col>
      </Row>
    </Page>
  )
}