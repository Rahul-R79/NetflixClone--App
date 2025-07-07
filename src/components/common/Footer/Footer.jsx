import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="netflix-footer pb-3">
            <Container>
                {/* Top message row */}
                <Row className="mb-4">
                    <Col>
                        <p>Questions? Call 000-800-919-1694</p>
                    </Col>
                </Row>

                {/* Footer Links */}
                <Row>
                    <Col xs={6} md={3} className="mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted">FAQ</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Investor Relations</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Privacy</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Speed Test</a>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={6} md={3} className="mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted">Help Centre</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Jobs</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Cookie Preferences</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Legal Notices</a>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={6} md={3} className="mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted">Account</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Ways to Watch</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Corporate Information</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Only on Netflix</a>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={6} md={3} className="mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted">Media Centre</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Terms of Use</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted">Contact Us</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                {/* Bottom copyright */}
                <Row>
                    <Col>
                        <p>Netflix India</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
