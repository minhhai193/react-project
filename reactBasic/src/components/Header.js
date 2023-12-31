import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/images/logo.png";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Header = (props) => {
  const { logout, user } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout success!")
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block mx-1"
          />
          React Project
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex justify-content-end" activeKey={location.pathname}>
            {(user && user.auth) &&
              <div className="d-md-flex me-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-link">Users Management</NavLink>
              </div>
            }
            <Nav>
              {user && user.email && user.email !== true &&
                <span className="nav-link">Welcome to  {user.email}</span>
              }
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                {user && user.auth === true
                  ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                  : <NavLink className="nav-link" to="/login">Login</NavLink>
                }
              </NavDropdown>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;