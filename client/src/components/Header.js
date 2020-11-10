import React, { Fragment } from 'react';
import {withRouter} from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {isAuthenticated, logout} from '../helpers/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

// When we use withRouter, we get access to some properties, which history is one of.
const Header = ({history}) => {
  const userName = isAuthenticated();
  // console.log(userName)
  
  //Event handler for log out
  const handleLogout = event => {
    logout(() => {
      history.push('/signin')
    })
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {/* If not logged in, they will see signup and signin */}
        {!isAuthenticated() && (
          <Fragment>
          <Nav.Link href="/Signup">Sign-up</Nav.Link>
          <Nav.Link href="/Signin">Sign-in</Nav.Link>             
          </Fragment>
            )}
        {/* If logged in and the role is 0 (regular user), they will see only user dashboard */}
        {isAuthenticated() && isAuthenticated().role === 0 && (
          <Fragment>
          <Nav.Link href="/user">User Dashboard</Nav.Link>         
          </Fragment>
            )}
        {/* If logged in and the role is 1 (admin), they will see only admin dashboard */}
        {isAuthenticated() && isAuthenticated().role === 1 && (
          <Fragment>
          <Nav.Link href="/admin">Admin Dashboard</Nav.Link>
          <Nav.Link href="/admin/create">Create a Post</Nav.Link>         
          </Fragment>
            )}
        {isAuthenticated() && (
          <Fragment>
          <Nav.Link href="/signin" onClick={handleLogout}>Logout</Nav.Link>
        <Nav.Link href="/admin/create">Welcome, {userName.username}</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>         
          </Fragment>
            )}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}



export default withRouter(Header);