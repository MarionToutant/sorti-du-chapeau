import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Col, Input, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';

function PlayerInput(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    props.addPlayer(name, email, props.id)
  }, [email, name])

  return (
    <Col className="Col">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Ami {props.id+1}</CardTitle>
          <InputGroup>
            <Input onChange={(e) => setName(e.target.value)} value={name} className="Input" placeholder="Nom"/>
          </InputGroup>
          <InputGroup>
            <Input onChange={(f) => setEmail(f.target.value)} value={email} className="Input" placeholder="Mail"/>
          </InputGroup>
        </CardBody>
      </Card>
    </Col>
  );
  
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayer: function(name, email, id){
      dispatch({type: 'addPlayer', name: name, email: email, id: id})
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(PlayerInput);