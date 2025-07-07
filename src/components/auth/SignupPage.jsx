import { useReducer, useContext, useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import netflixBg from '../../assets/images/netflix-bg.jpg';

// Initial state for the reducer
const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    isSubmitting: false,
};

// Reducer function for managing form state
function reducer(state, action) {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_CONFIRM_PASSWORD":
            return { ...state, confirmPassword: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "RESET_ERROR":
            return { ...state, error: "" };
        case "START_SUBMIT":
            return { ...state, isSubmitting: true };
        case "END_SUBMIT":
            return { ...state, isSubmitting: false };
        default:
            return state;
    }
}

const Signup = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [validated, setValidated] = useState(false);
    const { signUp, error: authError, isLoading, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect user to homepage if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Form submission handler
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        dispatch({ type: "RESET_ERROR" });

        // Bootstrap validation check
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // Password match check
        if (state.password !== state.confirmPassword) {
            dispatch({
                type: "SET_ERROR",
                payload: "Passwords do not match.",
            });
            setValidated(true);
            return;
        }

        dispatch({ type: "START_SUBMIT" });

        try {
            await signUp(state.email, state.password);
            navigate("/login", { state: { email: state.email }, replace: true });
        } catch (err) {
        } finally {
            dispatch({ type: "END_SUBMIT" });
            setValidated(true);
        }
    };

    // Show loading spinner if auth is in progress
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 text-white"
            style={{ backgroundImage: `url(${netflixBg})`, backgroundSize: 'cover' }}
        >
            <div
                className="auth-form p-3 p-md-4 rounded shadow mx-2"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h2 className="text-center mb-4 fw-bold">Sign Up</h2>

                {/* Display validation or auth errors */}
                {(state.error || authError) && (
                    <Alert variant="danger" className="text-center">
                        {state.error || authError}
                    </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationEmail">
                        <Form.Label className="text-white">Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={(e) =>
                                dispatch({ type: "SET_EMAIL", payload: e.target.value })
                            }
                            className="bg-dark text-white border-secondary opacity-50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationPassword">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            minLength={6}
                            value={state.password}
                            onChange={(e) =>
                                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                            }
                            className="bg-dark text-white border-secondary opacity-50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationConfirmPassword">
                        <Form.Label className="text-white">Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={(e) =>
                                dispatch({
                                    type: "SET_CONFIRM_PASSWORD",
                                    payload: e.target.value,
                                })
                            }
                            className="bg-dark text-white border-secondary opacity-50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please confirm your password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                            className="text-white"
                        />
                    </Form.Group>

                    <Button
                        variant="danger"
                        type="submit"
                        className="w-100 fw-bold"
                        disabled={state.isSubmitting || isLoading}
                    >
                        {state.isSubmitting || isLoading ? (
                            <Spinner size="sm" />
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </Form>
                {/* Navigation link to login */}
                <div className="mt-3 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-danger">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
