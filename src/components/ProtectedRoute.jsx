import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle navigation based on authentication state
    useEffect(() => {
        if (!isLoading) {
            // If authenticated and trying to access login/signup, redirect to home
            if (isAuthenticated && ['/login', '/signup'].includes(location.pathname)) {
                navigate("/", { replace: true });
            }
            // If not authenticated and trying to access a protected route, redirect to login
            else if (!isAuthenticated && !['/login', '/signup', '/'].includes(location.pathname)) {
                navigate("/login", { replace: true, state: { from: location } });
            }
        }
    }, [isLoading, isAuthenticated, location, navigate]);

    // Prevent back button when already authenticated
    useEffect(() => {
        if (isAuthenticated && ['/login', '/signup'].includes(location.pathname)) {
            const handlePopState = () => {
                window.history.pushState(null, "", window.location.pathname);
            };
            window.history.pushState(null, "", window.location.pathname);
            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isAuthenticated, location.pathname]);

    // loading spinner
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    // Prevent rendering for unauthorized access 
    if (!isAuthenticated && !['/login', '/signup', '/'].includes(location.pathname)) {
        return null;
    }

    return children || <Outlet />;
};

export default ProtectedRoute;
