import React from 'react';

class TaskItem extends React.Component {
    render() {
        var props = this.props;

        return (
            <li key={props.task.id}>{props.task.task}</li>
        )
    }
}

export default TaskItem;
