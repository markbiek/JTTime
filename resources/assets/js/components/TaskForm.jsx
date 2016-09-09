import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import CompanySelect from './CompanySelect.jsx';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
    
        console.log(this.props);
    }

    change(e) {
        var elem = e.target;
        var form = {
            prop: elem.id,
            value: elem.value
        };

        store.dispatch({
            type: 'TASK_FORM_CHANGE',
            form
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Add Task</h2>
                    <form className="form">
                        <div className="form-group">
                            <label>Company:</label>
                            <CompanySelect change={this.change}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task">Task:</label>
                            <input type="text" id="task" className="form-control" placeholder="Task" onChange={this.change} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hours">Hours:</label>
                            <input type="number" id="hours" className="form-control" placeholder="Hours" onChange={this.change} />
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
        task: store.taskFormState
    };
};

export default connect(mapStateToProps)(TaskForm);
