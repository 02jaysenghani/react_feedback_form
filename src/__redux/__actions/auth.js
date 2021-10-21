import { AuthConstants } from '../../__constant/auth'
import AuthService from '../../__services/AuthService'


function signin(email, password) {
	const success = AuthService.signin(email, password)
	let data = {
		type: AuthConstants.SIGNIN_FAILURE,
		user: {}
	}

	if (success) {
		data.type = AuthConstants.SIGNIN_SUCCESS;
		data.user = {email: email};
	}

	return data
}

function signout() {
	AuthService.signout()
	return {
		type: AuthConstants.SIGN_OUT
	}
}

function signup(email, password) {
	const success = AuthService.signup(email, password)
	let data = {
		type: AuthConstants.REGISTER_FAILURE,
		user: {}
	}

	if (success) {
		data.type = AuthConstants.REGISTER_SUCCESS;
		data.user = {email: email};
	}

	return data
}

export const AuthActions = {
	signin,
	signout,
	signup
}