import React, { useContext } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import AppContext from "../../contexts/AppContext"
import logo from "../../images/logo.png"
import AuthService from "../../contexts/AuthContext"

export default function NavigationBar() {
	const globalContext = useContext(AppContext);

	function logout() {
		AuthService.signout()
		globalContext.changeLoggedInUserStatus();
	}

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

				{globalContext.isUserLoggedIn ?
					<Nav>
						<Nav.Link as={Link} to="/feedbacks">Feedbacks</Nav.Link>
						<Nav.Link onClick={logout.bind(this)} as={Link} to="/">Logout</Nav.Link>
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
