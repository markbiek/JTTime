import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';
import {
    getUnbilledTaskTotals
} from '../modules/Tasks/action';

class TaskTotals extends React.Component {
    componentDidMount() {
        getUnbilledTaskTotals()
    }

    render() {
        const { totals } = this.props.taskState.toJS();

        console.log(totals);

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
