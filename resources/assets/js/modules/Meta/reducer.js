import { fromJS, List } from 'immutable';

/** Meta Store **/
const metaInitialState = fromJS({
    tab: 'add-task'
})

export const metaReducer = function (state = metaInitialState, action) {
    switch (action.type) {
        case 'META_SET_ACTIVE_TAB':
            return state.set('tab', action.tab);
    }

    return state;
}
