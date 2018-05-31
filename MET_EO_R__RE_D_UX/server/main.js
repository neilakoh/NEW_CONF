import { Meteor } from 'meteor/meteor';
import {Tasks} from '../imports/collections/index.js';

Meteor.startup(() => {

});

Meteor.methods({
  sendName(name) {
  	return name;
  },
  saveTask(query) {
  	return Tasks.insert(query, (error, result)=>{
  		if(error) {
  			return error;
  		} else {
  			return result;
  		}
  	});
  },
  removeTask(query) {
    return new Promise((resolve)=>{
      try {
      	Tasks.remove(query, (error, result)=>{
      		if(error) {
      			resolve(error);
      		} else {
      			resolve(result);
      		}
      	});
      } catch (err) {
        throw new Error(err);
      }
    })
  },
  fetchTasks(query) {
    return new Promise((resolve)=>{
      try {
        let queryResult = Tasks.find(query).fetch();
        console.log(queryResult);
      } catch (e) {
        throw new Error(e);
      }
    });
  }
});
