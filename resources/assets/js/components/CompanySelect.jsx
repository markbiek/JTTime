import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';

class CompanySelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.companies.size > 0) {
            return (
                <div className="select">
                    <select id="company" onChange={this.props.change}>
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
                </div>
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
        companies: store.companyState.get('companies')
    };
};

export default connect(mapStateToProps)(CompanySelect);
