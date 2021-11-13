import { useContext } from "react";
import { Navbar, NavbarBrand, NavLink, Nav, Button } from "react-bootstrap";
import { Context as AuthContext } from "../../context/AuthContext";

const CustomNavbar = () => {
  const { state: { logged }, update_logged,  authentication } = useContext(AuthContext);


  const onClickHandler = _ => {
    update_logged();
    authentication('logout');
  }

  return (
    <div>
      <Navbar
        className="d-flex justify-content-between"
        bg="dark"
        variant="dark"
      >
        <NavbarBrand>GitHub Repositories</NavbarBrand>
        <Nav>
          <NavLink>{logged.email ? logged.email : null}</NavLink>
          <Button className="nav-link" variant="link" onClick={onClickHandler}>
            exit
          </Button>
          
        </Nav>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
