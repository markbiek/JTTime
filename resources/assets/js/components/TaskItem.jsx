import React from 'react';
import axios from 'axios';
import store from '../store.js';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete(id, e) {
        e.nativeEvent.preventDefault();

        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        axios.post('/api/tasks/delete', {
            id: id    
            })
            .then(function (response) {
                var data = response.data;
                var task = {id: id};

                if (data.status == 'ok') {
                    store.dispatch({
                        type: 'DELETE_TASK',
                        task
                    });
                } else {
                    alert(data.msg);
                }
            })
            .catch(function (err) {
                console.log('Error deleting task.');
                console.log(err);
            });
    }

    render() {
        var props = this.props;

        return (
            <tr key={props.task.id}>
                <td className="icons">
                    <a href="#" onClick={(e) => this.delete(props.task.id, e)}><span className="fa fa-trash-o"></span></a>
                </td>
                <td>{props.task.company.name}</td>
                <td>{props.task.task}</td>
                <td>{props.task.hours}</td>
                <td>{props.task.created_at}</td>
            </tr>
        )
    }
}

export default TaskItem;
