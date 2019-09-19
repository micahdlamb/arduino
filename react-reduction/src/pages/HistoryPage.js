import React, {useState, useEffect} from 'react';
import Page from 'components/Page';
import { Line } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import { Card, CardHeader, CardBody } from 'reactstrap';

let options = {
  scales: {
    xAxes: [{
      type: 'time',
    }]
  }
}


export default function HistoryPage(){

  let [data, setData] = useState([])

  useEffect(() => {
    async function pullLogs(){
      let text = await fetch('logs/chiller1-temp').then(resp => resp.text())
      let lines = text.trim().split("\n").map(line => line.split(' '))
      let data = lines.map(line => ({x: new Date(line[0]*1000), y: line[1]}))
      setData(data)
    }
    pullLogs()
  }, [])

  let datasets = [
    {
      label: 'Chiller 1',
      data,
      backgroundColor: getColor('primary'),
      borderColor: getColor('primary'),
      borderWidth: 2,
      fill: false
    }
  ]

  return (
    <Page title="History">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>
              Temperatures
            </CardHeader>
            <CardBody>
              <Line data={{datasets}} options={options} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};
