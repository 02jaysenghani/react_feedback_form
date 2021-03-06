import React, { useRef, useState } from "react"
import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { AuthActions } from "../../__redux/__actions/auth"
import { AuthConstants } from "../../__constant/auth"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const duplicate = dispatch(AuthActions.signup(emailRef.current.value, passwordRef.current.value))
      if (duplicate.type === AuthConstants.REGISTER_FAILURE) {
        setError("Email id is already created")
        setLoading(false)
        return
      }
      setSuccess("Account Created Successfully")

      setTimeout(() => {
        history.push("/login")
			}, 1000);
    } catch {
      setError("Failed to create an account")
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
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group> <br />
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group> <br />
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group><br />
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  )
}