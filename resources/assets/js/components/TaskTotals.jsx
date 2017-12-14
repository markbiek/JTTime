import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import {
    getUnbilledTaskTotals
} from '../modules/Tasks/action';

const { dispatch } = store;

class TaskTotals extends React.Component {
    componentDidMount() {
        dispatch(getUnbilledTaskTotals());
    }

    render() {
        const { totals } = this.props.taskState.toJS();

        if (totals == undefined || totals.length <= 0) {
            return null;
        }

        return (
            <div>
                <h2>Unbilled $</h2>
                <ul>
                {
                    totals.map(item => {
                        return (
                            <li>{item.company_name} &mdash; ${item.unbilled}</li> 
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        taskState: store.taskState
    };
};

export default connect(mapStateToProps)(TaskTotals);
