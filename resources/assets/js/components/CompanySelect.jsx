import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store.js';

class CompanySelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []    
        };
    }

    componentWillMount() {
        var self = this;

        axios.get('/api/companies')
            .then((response) => {
                this.setState({
                    companies: response.data
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        if (this.state.companies.length > 0) {
            return (
                <select id="company" className="form-control" onChange={this.props.change}>
                    <option key="0" value=""></option>
                {
                    this.state.companies.map(company => {
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

export default CompanySelect;
