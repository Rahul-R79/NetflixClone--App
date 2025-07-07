import { useReducer, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import netflixBg from '../../assets/images/netflix-bg.jpg';

//Initial State
const initialFormState = {
    email: "",
    password: "",
    error: "",
    isSubmitting: false,
    validated: false,
};

//Reducer Function
function formReducer(state, action) {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };

        case "SET_PASSWORD":
            return { ...state, password: action.payload };

        case "SET_ERROR":
            return { ...state, error: action.payload };

        case "RESET_ERROR":
            return { ...state, error: "" };

        case "START_SUBMIT":
            return { ...state, isSubmitting: true };

        case "END_SUBMIT":
            return { ...state, isSubmitting: false };

        case "SET_VALIDATED":
            return { ...state, validated: action.payload };

        default:
            return state;
    }
}

const Login = () => {
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
    const { login, isAuthenticated, error: authError, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    //Redirect if user is already logged in 
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location.state]);

    //Prevent browser back navigation post login
    useEffect(() => {
        if (isAuthenticated) {
            const handleBackButton = () => {
                window.history.forward();
            };

            window.addEventListener('popstate', handleBackButton);

            return () => {
                window.removeEventListener('popstate', handleBackButton);
            };
        }
    }, [isAuthenticated]);

    //Pre-fill email if redirected from Signup
    useEffect(() => {
        if (location.state?.email) {
            dispatchForm({ type: "SET_EMAIL", payload: location.state.email });
        }
    }, [location.state]);

    //Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        dispatchForm({ type: "RESET_ERROR" });

        if (form.checkValidity() === false) {
            e.stopPropagation();
            dispatchForm({ type: "SET_VALIDATED", payload: true });
            return;
        }

        dispatchForm({ type: "START_SUBMIT" });
        dispatchForm({ type: "SET_VALIDATED", payload: true });

        try {
            await login(formState.email, formState.password);
        } catch (err) {
        } finally {
            dispatchForm({ type: "END_SUBMIT" });
        }
    };

    //Show Spinner during global loading
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 text-white p-3"
            style={{
                backgroundImage: `url(${netflixBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div
                className="auth-form p-3 p-md-4 rounded shadow mx-auto"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    width: "100%",
                    maxWidth: "450px",
                }}
            >
                <h2 className="text-center mb-4 fw-bold">Login</h2>
                {(formState.error || authError) && (
                    <Alert variant="danger" className="text-center">
                        {formState.error || authError}
                    </Alert>
                )}
                <Form noValidate validated={formState.validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={formState.email}
                            onChange={(e) =>
                                dispatchForm({ type: "SET_EMAIL", payload: e.target.value })
                            }
                            required
                            className="bg-dark text-white border-secondary opacity-50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={formState.password}
                            onChange={(e) =>
                                dispatchForm({ type: "SET_PASSWORD", payload: e.target.value })
                            }
                            required
                            minLength={6}
                            className="bg-dark text-white border-secondary opacity-50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant="danger"
                        type="submit"
                        className="w-100 fw-bold mt-3 py-2"
                        disabled={formState.isSubmitting || isLoading}
                    >
                        {formState.isSubmitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="ms-2">Logging in...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-danger">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
