import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import store from '../store';

import {
    loadUnbilledTaskTotals,
    loadUnbilledTasks,
    watchClearCheckedTasks,
    watchDeleteTask
} from '../modules/Tasks/sagas';

export default function* rootSaga() {
    yield all([
        loadUnbilledTaskTotals(),
        loadUnbilledTasks(),
        watchClearCheckedTasks(),
        watchDeleteTask()
    ]);
}
