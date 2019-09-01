import React, {useState} from 'react';
import Page from 'components/Page';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import ChartPins from 'components/ChartPins';
import ReadPin from 'components/ReadPin';
import { connect } from 'react-redux';
import {notify} from 'actions';
import {chiller1} from 'chips';

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
]

let pressureCurves = [
  {
    label: 'Chiller 1',
    chip: chiller1,
    pin: 1,
    backgroundColor: getColor('secondary'),
    borderColor: getColor('secondary'),
    borderWidth: 2,
    fill: false
  }
]

const ChartsPage = ({notify}) => {

  let temperature = value => {
    let alert = value >= 80 || null
    setAlert(alert)
    if (alert)
      notify({
        avatar: hotIcon,
        message: 'Chiller got hot',
      })
  
    return <span className={alert && 'warn-text'}><strong>{value.toFixed(2)}</strong>° C</span>
  }

  let pressure = value => {
    let alert = value > .5 || null
    return <span className={alert && 'warn-text'}><strong>{value}</strong> Pa</span>
  }

  let [alert, setAlert] = useState(null)

  return (
    <Page title="Chiller 1" className={alert && 'warn-page'}>
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
  );
};


export default connect(({}) => ({}), { notify })(ChartsPage);
