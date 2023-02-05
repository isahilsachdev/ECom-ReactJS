import {Navbar, Nav} from 'react-bootstrap';
import './Headers.css';

function Headers() {
  return (
    <Navbar>
        <Nav>
          <div className="navbar-container">
          <Nav.Link className="navbar-item" href="/">Home</Nav.Link>
          <Nav.Link className="navbar-item" href="/cart">Cart</Nav.Link>
          </div>
        </Nav>
    </Navbar>
  );
}

export default Headers;