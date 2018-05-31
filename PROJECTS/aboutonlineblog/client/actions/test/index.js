import { Meteor } from 'meteor/meteor';

export function saveName(name) {
	return (dispatch) => {
		Meteor.call("sendName", name, (err, res)=>{
			if(err) {
				dispatch(errorHandler('FAILED', err));
			} else {
				dispatch(successHandler('SUCCESS', res));
			}
		});
	}
}
