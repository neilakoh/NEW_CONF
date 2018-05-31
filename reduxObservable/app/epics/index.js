import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/switchMap';
import { TEST_REDUCERS, endAction } from '../actions/index.js';
import { TestCallback, TestPromise } from '../api.js';

export function testEpic(action$) {
    // 1. NORMAL PASSING OF DATA
    // return action$.ofType(TEST_REDUCERS).switchMap((result) => {
    //     return Observable.of(endAction('hala'))
    // });

    // 2. CALLBACK
    // return action$.ofType(TEST_REDUCERS).switchMap((result) => {
    //     const getTestCallback = Observable.bindCallback(TestCallback);

    //     // OPTION 1
    //     return getTestCallback('neil gwapo').flatMap(res => Observable.of(endAction(res)))
    //     // OPTION 2
    //     return getTestCallback('neil gwapo').map(res => endAction(res))
    // });

    // 3. PROMISE
    return action$.ofType(TEST_REDUCERS).switchMap((result) => {
        const getTestInsideClassPromise = Observable.fromPromise(TestPromise('hala'));
        return getTestInsideClassPromise.map(res => endAction(res))
    });
}

export const rootEpic = combineEpics(
    testEpic
);