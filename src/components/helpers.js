export function validate(values){
	const errors = {};
	if (!values.username){
		errors.username = 'Username Required';
	}
	if (!values.email){
		errors.email = 'Email Required';
	}
	if (!values.password){
		errors.password = 'Password Required';
	}
	if (values.password && values.password.length < 6){
		errors.password = 'Passwords must be at least 6 Characters Long';
	}
	if (!values.confirm_password){
		errors.confirm_password = 'Enter confirmation Password';
	}
	if(values.password !== values.confirm_password){
		console.log('Look at me ',values.confirm_password);
		errors.confirm_password = 'Passwords do not match';
	}
	return errors;
}
