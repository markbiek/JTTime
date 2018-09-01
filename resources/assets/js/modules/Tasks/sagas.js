import { fromJS } from 'immutable';
import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import {
    CLEAR_CHECKED_TASKS,
    DELETE_TASK
} from './action';

import {
    fetchUnbilledTaskTotals,
    fetchUnbilledTasks,
    actionGetUnbilledTaskTotals,
    actionGetUnbilledTasks,
    actionTasksIsLoading,
    actionTasksIsErrored,
    actionTasksIsComplete,
    actionAddTask,
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

async function* addTask(task) {
    const resp = await axios.post('/api/tasks/add', task);
}

async function* deleteTask(task) {
    console.log('deleteTask:');
    console.log(task);

    const resp = await axios.post('/api/tasks/delete', task);
};

export function* watchClearCheckedTasks() {
    yield takeEvery(CLEAR_CHECKED_TASKS, loadUnbilledTasks);
    yield takeEvery(CLEAR_CHECKED_TASKS, loadUnbilledTaskTotals);
}

export function* watchAddTask(action) {
    yield takeEvery(ADD_TASK, addTask, action.task)
}

export function* watchDeleteTask(action) {
    console.log('watchDeleteTask:');
    console.log(action);
    if (action == undefined) {
        return;
    }

    yield takeEvery(DELETE_TASK, deleteTask, action.task);
}
