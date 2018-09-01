import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import store from '../store.js';
import CompanySelect from './CompanySelect.jsx';

import {
    actionTaskFormChange,
    actionAddTask,
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

        dispatch(actionAddTask(task));

        this.clearForm();
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
            <div className="card task-form">
                <div className="card-content">
                    <h2>Add Task</h2>
                    <form className="form" id="task-form">
                        <div className="field">
                            <label className="label">Company:</label>
                            <div className="control">
                                <CompanySelect change={this.change}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="date">Date:</label>
                            <div className="control">
                                <input className="input" type="date" id="date" placeholder="Date" onChange={this.change} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="task">Task:</label>
                            <div className="control">
                                <input className="input" type="text" id="task" placeholder="Task" onChange={this.change} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="hours">Hours:</label>
                            <div className="control">
                                <input className="input" type="number" id="hours" placeholder="Hours" min="0" onChange={this.change} />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="button" className="button" onClick={this.submit}>Save</button>
                            </div>
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
