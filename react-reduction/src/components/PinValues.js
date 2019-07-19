import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

import {FaPause, FaPlay} from 'react-icons/fa';

import * as chip from 'chip';

const PinValues = ({ title, datasets, options, history, freq, ...restProps }) => {
  const chart = useRef(null);

  let [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) return
    let id = setInterval(async () => {
      await Promise.all(datasets.map(async curve => {
        let value = await chip.readPin(curve.pin)
        curve.data.push(value)
        if (curve.data.length > history*freq)
          curve.data.shift()
      }))

      labels.push(Date.now())
      if (labels.length > history*freq)
        labels.shift()

      chart.current.chartInstance.update()
    }, 1000/freq)

    return () => {
      clearInterval(id)
    }
  }, [history, freq, pause])

  const labels = useState([])[0];
  
  datasets.forEach(curve => {
    curve.data = useState([])[0]
  })

  return (
    <Card {...restProps}>
      <CardHeader>
        {title}
        <Button onClick={event => setPause(!pause)} size="sm" className='float-right' style={{padding: '0rem .2rem'}}>
          {pause ? <FaPlay/> : <FaPause/>}
        </Button>
      </CardHeader>
      <CardBody>
        <Line ref={chart} data={{labels, datasets}} options={options} />
      </CardBody>
    </Card>
  );
};

PinValues.propTypes = {
  title: PropTypes.string,
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.number,
  freq: PropTypes.number
};

PinValues.defaultProps = {
  history: 30,
  freq: 1
};

export default React.memo(PinValues);
