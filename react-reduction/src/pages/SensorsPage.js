import React, {useState, useRef} from 'react';
import Page from 'components/Page';
import { Row, Col, Card, CardHeader, CardBody, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import * as fa from 'react-icons/fa';
import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import ReadPin from 'components/ReadPin';
import TogglePin from 'components/TogglePin';
import { connect } from 'react-redux';
import {notify} from 'actions';
import {chiller1} from 'chips';


const SensorsPage = ({notify}) => {
  
  let temperature = value => {
    if (maxTemp.current && maxTemp.current.value){
      var alert = value >= maxTemp.current.value || null
      setAlert(alert)
      if (alert)
        notify({
          avatar: hotIcon,
          message: 'Motor got hot',
        })
    }
    return <span className={alert && 'warn-text'}>{value.toFixed(1)}° F</span>
  }

  let maxTemp = useRef(null)
  let [alert, setAlert] = useState(null)

  return (
    <Page title="Sensors" className={alert && 'warn-page'}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>
              <h3 className="d-none d-md-block">Chiller 1</h3>
              <h3 className="d-md-none"><fa.FaRobot/></h3>
              <div>
                <InputGroup>
                  <Input
                    type='number'
                    innerRef={maxTemp}
                    defaultValue={80}
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
              <TogglePin chip={chiller1} pin={6} />
            </CardHeader>
            <CardBody className='text-center text-nowrap' style={{fontSize: '20vw'}}>
              <ReadPin chip={chiller1} pin='T1' render={temperature}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};


export default connect(({}) => ({}), { notify })(SensorsPage);