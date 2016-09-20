import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Immutable from 'immutable';
import store from '../store.js';

class CompanySelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.companies.size > 0) {
            return (
                <select id="company" className="form-control" onChange={this.props.change}>
                    <option key="0" value=""></option>
                {
                    this.props.companies.toArray().map(company => {
                        company = company.toObject();
                        return (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        )
                    })
                }
                </select>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}

const mapStateToProps = function(store) {
    return {
        companies: store.metaState.get('companies')
    };
};

export default connect(mapStateToProps)(CompanySelect);
