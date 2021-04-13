import * as ActionTypes from './ActionTypes'

export const comments = (state = {
    errMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMessage: null, comments: action.payload }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMessage: action.payload, comments: [] }

        case ActionTypes.ADD_COMMENT:
            const lastId = state.comments.pop().id
            action.payload.id = lastId + 1
            return { ...state, errMessage: null, comments: state.comments.concat(action.payload)}

        default:
            return state;
    }
}