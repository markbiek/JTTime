import React from 'react';
import axios from 'axios';
import store from '../store.js';

import {
    actionTaskChecked,
    deleteTask,
    getUnbilledTaskTotals,
} from '../modules/Tasks/action';

import EditableLabel from './EditableLabel.jsx';

const { dispatch } = store;

class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
        this.check = this.check.bind(this);
    }

    delete(id, e) {
        e.nativeEvent.preventDefault();

        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        dispatch(deleteTask({id: id}));
    }

    check(id, e) {
        var chk = e.target;
        var task = {
            id: chk.value,
            checked: chk.checked
        }

        dispatch(actionTaskChecked(task));
    }

    render() {
        var props = this.props;

        return (
            <tr key={props.task.id}>
                <td className="icons">
                    <a href="#" onClick={(e) => this.delete(props.task.id, e)}><span className="fa fa-trash-o"></span></a>
                </td>
                <td>
                    <input type="checkbox" value={props.task.id} onClick={(e) => this.check(props.task.id, e)} />
                </td>
                <td>{props.task.company.name}</td>
                <td>
                    <EditableLabel
                        initialValue={props.task.task}
                        store={value => {
                            console.log(`store: ${value}`);
                        }}
                    />
                </td>
                <td>{props.task.hours}</td>
                <td>{props.task.created_at}</td>
            </tr>
        )
    }
}

export default TaskItem;
