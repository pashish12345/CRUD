import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

const FormContainer = ({children}) => {
  return (
    <>
    
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}    >
                    {children}

        </Col>
      </Row>
    </Container>
    
    </>
  )
}

export default FormContainer
