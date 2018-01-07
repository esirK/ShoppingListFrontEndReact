import React from 'react';
import {shallow} from 'enzyme';

import NotFound from '../../components/not_found';

describe('Not found',()=>{
	const notFound = shallow(<NotFound />);
	it('has not_found class', ()=>{
		expect(notFound.find('.not_found').length).toBe(1);
	});
});