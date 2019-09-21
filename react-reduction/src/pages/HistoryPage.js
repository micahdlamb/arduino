import React, {useState, useEffect} from 'react';
import Page from 'components/Page';
import { Line } from 'react-chartjs-2';
import { getColor } from 'utils/colors';
import * as rs from 'reactstrap';
import * as fa from 'react-icons/fa';
import EditSetting from 'components/EditSetting';

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
      <rs.Row>
        <rs.Col xl={12} lg={12} md={12}>
          <rs.Card>
            <rs.CardHeader>
              <h3>Temperatures</h3>
              <div>
                <rs.InputGroup>
                  <EditSetting setting='historyInterval' type='number' placeholder='Record Interval (s)'/>
                  <rs.InputGroupAddon addonType="append">
                    <rs.InputGroupText>
                      <fa.FaHistory/>
                    </rs.InputGroupText>
                  </rs.InputGroupAddon>
                </rs.InputGroup>
              </div>
            </rs.CardHeader>
            <rs.CardBody>
              <Line data={{datasets}} options={options} />
            </rs.CardBody>
          </rs.Card>
        </rs.Col>
      </rs.Row>
    </Page>
  );
};
