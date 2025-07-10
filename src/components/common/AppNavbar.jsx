import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import netflixLogo from '../../assets/images/netflix.svg';
import { Navbar, Nav, Button, Container, Spinner } from "react-bootstrap";

const AppNavbar = () => {
    const { isAuthenticated, logout, isLoading: authLoading } = useContext(AuthContext);

    // for handling logout
    const handleLogout = () => {
        logout();
    };

    //Show loading spinner while auth state is loading
    if (authLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    return (
        <Navbar
            expand="lg"
            variant="dark"
            className="bg-transparent position-absolute w-100 z-3 mt-4"
        >
            <Container>
                {/* Brand Logo */}
                <Navbar.Brand as={Link} to="/">
                    <img src={netflixLogo} alt="Netflix" width="120" height="32" />
                </Navbar.Brand>

                {/* Right Side Nav Buttons */}
                <Nav className="ms-auto">
                    {isAuthenticated ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="danger" as={Link} to="/login">
                            Sign In
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
