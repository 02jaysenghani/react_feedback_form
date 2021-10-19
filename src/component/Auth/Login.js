import React, { useRef, useState, useContext  } from "react"
import { Form, Button, Card, Alert, Container  } from "react-bootstrap"
import AuthService  from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AppContext from "../../contexts/AppContext"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const globalContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      
      const success = AuthService.login(emailRef.current.value, passwordRef.current.value)
      if (success) {
        globalContext.changeLoggedInUserStatus()
        history.push("/dashboard")
      } else {
        setError("No Active Account Found")
      }
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 96px)" }}
    >
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group> <br/>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group> <br/>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
    </Container>
  )
}