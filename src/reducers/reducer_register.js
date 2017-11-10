import { REGISTER_USER } from '../actions/index';

export default function(state = [], action) {
    switch (action.type){
	case REGISTER_USER:
        return [action.payload.data, ...state];
	}
	return state;
}