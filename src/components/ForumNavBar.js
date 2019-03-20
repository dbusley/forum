import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class ForumNavBar extends Component {

  render() {
    return <Navbar bg="light" expand="lg">
      <Navbar.Brand>Simple Forum</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/forums">Forums</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>;
  }
}

export default ForumNavBar;