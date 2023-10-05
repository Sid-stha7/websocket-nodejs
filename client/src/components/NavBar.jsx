import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Stack } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Chat App
          </Link>
        </h2>
        <span className="text-warning ">Logged in as Charlse</span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to="/register" className="link-light text-decoration-none">
              Register
            </Link>
            <Link to="/login" className="link-light text-decoration-none">
              Login
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
