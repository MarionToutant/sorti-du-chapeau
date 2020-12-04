import React, { useState } from 'react';
import './App.css';
import logo from './magic-hat.png';
import PlayerInput from './components/PlayerInput.js';
import { Container, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';

function Home(props) {

  const [nameInputCount, setNameInputCount] = useState(1);
  const [backendResponse, setBackendResponse] = useState([]);

  var nameInputList = [];
  for(var i=0; i<nameInputCount; i++){
    nameInputList.push(<PlayerInput id={i}/>);
  }

  var handleAddInput = async () => {
    setNameInputCount(nameInputCount+1);
  }

  var handleRemoveInput = async () => {
    setNameInputCount(nameInputCount-1);
    if(props.nameList.length === nameInputCount) {
      props.removePlayer();
    }
  }

  var handleSendEmail = async () => {
    var data = JSON.stringify(props.nameList);
    await fetch(`/sendEmail`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data === "OK") {
        setBackendResponse(<h2>Messages envoyés !!!</h2>);
      } else {
        setBackendResponse(<h2>Erreur &#128557;... Réessaie avec d'autres données</h2>);
      } 
    })
  }

  return (
    <div className="App"> 
      <header className="Header">
        <img src={logo} width="30" height="30" className="Logo" alt="logo"/>
        Sorti du chapeau
      </header>
      <body className="Body">
        <h2>1. Ajoute les amis de ton Noël surprise, ton jeu de Killer... &#128512;</h2>  
        <br/>
        <Container>
          <Row className="Input-group" xs="6">
            {nameInputList}
          </Row>
          <Button onClick={() => {handleAddInput()}} className="Button" style={{width:'80px'}} type="primary">Ajouter</Button>
          <Button onClick={() => {handleRemoveInput()}} className="Button" style={{width:'80px'}} type="primary">Retirer</Button>
        </Container>
        <br/>
        <h2>2. Envoie un mail à chacun des amis avec le nom de son ami affecté ! &#128540;</h2>
        <Button onClick={() => {handleSendEmail()}} className="Button" style={{width:'150px'}} type="primary">Envoyer les mails</Button>
        <br/>
        {backendResponse}
      </body>
    </div>
  );
}

function mapStateToProps(state) {
  return { nameList: state.nameList }
}
  
function mapDispatchToProps(dispatch) {
  return {
    removePlayer: function() {
        dispatch( {type: 'removePlayer'} )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
