import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

import {
   actionSetActiveTab, 
} from '../modules/Meta/action';

const { dispatch } = store;

class DashboardNav extends React.Component {
    render() {
        const { tab } = this.props;

        return (
            <div className="tabs">
                <ul>
                    <li className={ tab == 'add-task' ? 'is-active' : '' }><a onClick={e => {
                        dispatch(actionSetActiveTab('add-task'));   
                    }}>Add Task</a></li>
                    <li className={ tab == 'invoices' ? 'is-active' : '' }><a onClick={e => {
                        dispatch(actionSetActiveTab('invoices'));   
                    }}>Invoices</a></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        tab: store.metaState.get('tab')
    };
};

export default connect(mapStateToProps)(DashboardNav);
