import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import ListGroup from 'react-bootstrap/ListGroup';
const Footer = () => {
  return (
    
        <Row>
            <Col>
            <div style={{width:'100%', height:'auto', backgroundColor:'grey' , margin:' 20px 0' }}>
            <ListGroup variant="flush" >
      <ListGroup.Item variant='primary'>Created by </ListGroup.Item>
      <ListGroup.Item variant='info'> Rushikesh Gonewar </ListGroup.Item>
      <ListGroup.Item variant='info'> Aniket Sarpate </ListGroup.Item>
      <ListGroup.Item variant='info'> Gajanan Dere </ListGroup.Item>
    </ListGroup>
      
    </div>
            </Col>
        </Row>
   
  )
}

export default Footer
