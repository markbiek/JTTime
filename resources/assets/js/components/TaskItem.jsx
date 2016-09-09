import React from 'react';

class TaskItem extends React.Component {
    render() {
        var props = this.props;

        return (
            <tr key={props.task.id}>
                <td>{props.task.company.name}</td>
                <td>{props.task.task}</td>
                <td>{props.task.hours}</td>
                <td>{props.task.created_at}</td>
            </tr>
        )
    }
}

export default TaskItem;
