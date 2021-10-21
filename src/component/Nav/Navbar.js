import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import { AuthActions } from "../../__redux/__actions/auth"

export default function NavigationBar() {
	const isLoggedIn = useSelector(state => state.authData.loggedIn)
	const dispatch = useDispatch()

	return (
		<Navbar bg="light" expand="lg" className="px-5">
			<Navbar.Brand>
				<Nav.Link as={Link} to="/">
					<img width="180" height="54" src={logo} className="App-logo" alt="logo" />
				</Nav.Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarScroll" />
			<Navbar.Collapse id="navbarScroll">
				<Nav
					className="me-auto"
					style={{ maxHeight: '100px' }}
					navbarScroll
				>
				</Nav>

				{isLoggedIn ?
					<Nav>
						<Nav.Link as={Link} to="/feedbacks">Feedbacks</Nav.Link>
						<Nav.Link onClick={() => dispatch(AuthActions.signout())} as={Link} to="/">Logout</Nav.Link>
					</Nav>
					:
					<Nav>
						<Nav.Link as={Link} to="/login">Login</Nav.Link>
						<Nav.Link as={Link} to="/signup">Signup</Nav.Link>
					</Nav>
				}
			</Navbar.Collapse>
		</Navbar>
	)
}
