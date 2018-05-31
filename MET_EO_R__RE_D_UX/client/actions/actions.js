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

export function fetchTasks(query) {
	return (dispatch) => {
		Meteor.call("fetchTasks", query, (err, res)=>{
			console.log(err);
			console.log(res);
		});
	}
}

export function saveTask(data) {
	return (dispatch) => {
		Meteor.call("saveTask", data, (err, res)=>{
			if(err) {
				let response ={
					success: false,
					data: {},
					documentId: err,
					process: "create"
				};
				dispatch(errorHandler('SAVE_TASK_FAILED', response));
			} else {
				let response ={
					success: true,
					data: data,
					documentId: res,
					process: "create"
				};
				dispatch(successHandler('SAVE_TASK_SUCCESS', response));
			}
		});
	}
}

export function removeTask(query) {
	return (dispatch) => {
		Meteor.call("removeTask", query, (err, res)=>{
			if(res > 0) {
				let response ={
			    success: true,
			    data: res,
			    documentId: query._id,
			    process: "hard-delete"
			  };
			  dispatch(successHandler('REMOVE_TASK_SUCCESS', response));
			} else {
				let response ={
			    success: false,
			    data: {},
			    documentId: err,
			    process: "hard-delete"
			  };
			  dispatch(errorHandler('REMOVE_TASK_FAILED', response));
			}
		});
	}
}

export function successHandler(type, value) {
	return {
		type: type, value
	}
}

export function errorHandler(type, value) {
	return {
		type: type, value
	};
}
