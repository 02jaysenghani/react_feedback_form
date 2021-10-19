import React, { useRef, useState } from "react"
import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import FeedbackService from "../../contexts/FeedbackContext"
import LocalStorageService from "../../contexts/LocalStorageContext"
import { Link } from "react-router-dom"

export default function FeedbackForm() {
	const emailRef = useRef()
	const nameRef = useRef()
	const commentRef = useRef()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(false)

	const userEmail = LocalStorageService.getData('userEmail')

	function handleSubmit(e) {
		e.preventDefault()

		try {
			setSuccess("")
			setError("")
			setLoading(true)

			const data = {
				name: nameRef.current.value,
				email: emailRef.current.value,
				comment: commentRef.current.value,
			}
			FeedbackService.saveFeedback(data)
			setSuccess("Feedback Sent Successfully")

			setTimeout(() => {
				nameRef.current.value = ''
				commentRef.current.value = ''
				setSuccess("")
			}, 2000);
		} catch {
			setError("Something went wrong, Please try again")
		}

		setLoading(false)
	}

	return (
		<Container
			className="d-flex mt-5 justify-content-center"
			style={{ minHeight: "calc(100vh - 96px)" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
			<div className="d-flex justify-content-end">
				<Button className="w-auto mb-4" as={Link} to="/feedbacks" variant="primary">Back</Button>
			</div>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Feedback Form</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						{success && <Alert variant="success">{success}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="name">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" ref={nameRef} required />
							</Form.Group> <br />
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required disabled value={userEmail} />
							</Form.Group> <br />
							<Form.Group id="Comment">
								<Form.Label>Comment</Form.Label>
								<Form.Control as="textarea" rows={3} type="text" ref={commentRef} required />
							</Form.Group> <br />
							<Button disabled={loading} className="w-100" type="submit">
								Send
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	)
}