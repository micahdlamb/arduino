import React, {useState} from 'react';
import Page from 'components/Page';
import { Row, Col } from 'reactstrap';
import { getColor } from 'utils/colors';
import hotIcon from 'assets/img/hot.png';
import PinValuesChart from 'components/PinValuesChart';
import ReadPinValue from 'components/ReadPinValue';
import TogglePin from 'components/TogglePin';
import { connect } from 'react-redux';
import {notify} from 'actions';



const MotorsPage = ({notify}) => {

  return (
    <Page title="Motors">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <TogglePin pin={6}/>
        </Col>
        <Col xl={6} lg={12} md={12}>
          
        </Col>
      </Row>
    </Page>
  );
};


export default connect(({}) => ({}), { notify })(MotorsPage);
