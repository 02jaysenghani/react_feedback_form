import React from "react"
import { Container, Table, Button } from "react-bootstrap"
import FeedbackService from "../../contexts/FeedbackContext"
import { Link } from "react-router-dom"
import LocalStorageService from "../../contexts/LocalStorageContext"

export default function FeedbackList() {
	const userEmail = LocalStorageService.getData('userEmail')

	let initialFeedbackData = FeedbackService.getFeedbackData().filter(x => x.email === userEmail)
	const [feedbackData, setList] = React.useState(initialFeedbackData);

	function deleteFeedback(index) {
		const newList = [...feedbackData.slice(0, index), ...feedbackData.slice(index + 1)];
		setList(newList)
		FeedbackService.setFeedbackData(newList)
	}

	return (
		<Container
			className="mt-5"
			style={{ minHeight: "calc(100vh - 96px)" }}
		>
			<div className="row d-flex justify-content-end">
				<Button className="w-auto mb-4" as={Link} to="/feedback/new" variant="primary">Add</Button>
			</div>

			<div className="row">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Sr. No.</th>
							<th>Name</th>
							<th>Email</th>
							<th>Comment</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{feedbackData.map((feedback, index) => {
							return (
								<tr key={index}>
									<td> {index + 1} </td>
									<td>{feedback.name}</td>
									<td>{feedback.email}</td>
									<td>{feedback.comment}</td>
									<td><Button className="w-auto" variant="danger" onClick={deleteFeedback.bind(this, index)} >Delete</Button></td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</Container>
	)
}