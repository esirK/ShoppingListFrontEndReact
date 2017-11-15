import React from 'react';
import logo from '../imgs/ic_error_outline_black_24dp_2x.png';

const NotFound = ()=>{
	return(
		<div className="not_found">
			<image src={logo} alt={'logo'}/>
        404 Page Not Found
		</div>);
};
export default NotFound;