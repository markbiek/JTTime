import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fromJS } from 'immutable';
import store from '../store.js';
import CompanySelect from './CompanySelect.jsx';

import {
    actionAddTask,
    actionTaskFormChange,
    getUnbilledTaskTotals,
} from '../modules/Tasks/action';

const { dispatch } = store;

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    clearForm() {
        document.getElementById('task-form').reset();
    }

    submit(e) {
        e.preventDefault();

        var task = this.props.form.toObject();
        task.billed = 0;

        axios.post('/api/tasks/add', task)
            .then((response) => {
                var task = fromJS(response.data);

                dispatch(actionAddTask(task));
                dispatch(getUnbilledTaskTotals());

                this.clearForm();
            })
            .catch(function (err) {
                console.log('Error adding task.');
                console.log(err);
            });
    }

    change(e) {
        var elem = e.target;
        var form = {
            prop: elem.id,
            value: elem.value
        };

        dispatch(actionTaskFormChange(form));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Add Task</h2>
                    <form className="form" id="task-form">
                        <div className="form-group">
                            <label>Company:</label>
                            <CompanySelect change={this.change}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" className="form-control" placeholder="Date" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="task">Task:</label>
                            <input type="text" id="task" className="form-control" placeholder="Task" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hours">Hours:</label>
                            <input type="number" id="hours" className="form-control" placeholder="Hours" min="0" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.submit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        form: store.taskState.get('form')
    };
};

export default connect(mapStateToProps)(TaskForm);
