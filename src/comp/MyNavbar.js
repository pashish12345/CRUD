import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNavbar = () => {
    return (
        <Navbar  style={{backgroundColor:"black"}}
        bg="primary" data-bs-theme="dark"
        collapseOnSelect expand="lg"  className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">MPVPI</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              
              <Nav style={{marginLeft:"auto"}} >
              <Nav.Link href="/addedit"> Add </Nav.Link>
                <Nav.Link href="/about">About </Nav.Link>
                <Nav.Link  href="#">
                  View
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    
}

export default MyNavbar
