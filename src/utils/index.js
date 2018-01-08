import jwt_decode from 'jwt-decode';


export const checkAuthenticationToken = () => {
	let token = localStorage.getItem('jwt');
	// decode token and get date
	if(token !== null) {
		let decoded_token = jwt_decode(token);
		return Date.now() < decoded_token.expires_at;
	}
	else {
		return false;
	}
};