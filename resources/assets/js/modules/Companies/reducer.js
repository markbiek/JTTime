import Immutable from 'immutable';

/** Company Store **/
const companyInitialState = Immutable.fromJS({
    companies: []
})

export const companyReducer = function (state = companyInitialState, action) {
    switch (action.type) {
        case 'GET_COMPANIES':
            return state.set('companies', action.companies);
    }

    return state;
}
