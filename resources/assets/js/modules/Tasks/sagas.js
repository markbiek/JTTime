import { fromJS } from 'immutable';
import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import {
    fetchUnbilledTaskTotals,
    fetchUnbilledTasks,
    actionGetUnbilledTaskTotals,
    actionGetUnbilledTasks,
    actionTasksIsLoading,
    actionTasksIsErrored,
    actionTasksIsComplete,
} from './action';

export function* loadUnbilledTaskTotals() {
    const resp = yield call(fetchUnbilledTaskTotals);
    const totals = fromJS(resp.data);

    yield put(actionGetUnbilledTaskTotals(totals));
}

export function* loadUnbilledTasks() {
    try {
        yield put(actionTasksIsLoading(true));

        const resp = yield call(fetchUnbilledTasks);
        const tasks = fromJS(resp.data);

        yield put(actionTasksIsLoading(false));
        yield put(actionTasksIsComplete(tasks));
    } catch (e) {
        yield put(actionTasksIsErrored(true, e));
    }
}
