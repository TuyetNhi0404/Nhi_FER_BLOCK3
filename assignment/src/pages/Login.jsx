import { useContext, useEffect, useState, useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function Login() {
  const { login, setRedirectAfterLogin, redirectAfterLogin } = useContext(AuthContext);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect_uri");
    if (redirect) setRedirectAfterLogin(redirect);
  }, [location.search, setRedirectAfterLogin]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.addToast({ bg: "success", body: "Signed in successfully" });
      navigate(redirectAfterLogin || "/");
    } catch (err) {
      toast.addToast({ bg: "danger", body: err.message || "Login failed" });
    }
  }, [email, password, login, navigate, redirectAfterLogin, toast]);

  return (
    <Card 
      className="mx-auto shadow-lg" 
      style={{ maxWidth: 480, backgroundColor: "#111", color: "#eee" }}
    >
      <Card.Body>
        <Card.Title className="mb-4 text-center" style={{ color: "#28a745" }}>
          Registered Customers
        </Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #28a745" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #28a745" }}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" style={{ backgroundColor: "#28a745", border: "none" }}>
              Sign in
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="outline-success"
              style={{ color: "#28a745", border: "1px solid #28a745" }}
            >
              Create an account
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
