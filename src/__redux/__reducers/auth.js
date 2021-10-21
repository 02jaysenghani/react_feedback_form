import { AuthConstants } from '../../__constant/auth'

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ?? {};

const AuthReducers = (state = initialState, action) => {
	switch (action.type) {
		case AuthConstants.SIGNIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user
			};

		case AuthConstants.SIGNIN_FAILURE:
			return {};

		case AuthConstants.SIGN_OUT:
			return {};

		case AuthConstants.REGISTER_SUCCESS:
			return {};
			
		case AuthConstants.REGISTER_FAILURE:
			return {};

		default:
			return state
	}
}

export default AuthReducers