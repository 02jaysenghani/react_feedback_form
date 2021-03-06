import React, { useRef, useState } from "react"
import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { AuthActions } from "../../__redux/__actions/auth"
import { AuthConstants } from "../../__constant/auth"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      
      const success = dispatch(AuthActions.signin(emailRef.current.value, passwordRef.current.value))
      if (success.type === AuthConstants.SIGNIN_FAILURE) {
        return setError("No Active Account Found")
      }
      history.push("/dashboard")
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
        <Card.Body className="p-4">
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
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
    </Container>
  )
}