import * as ActionTypes from './ActionTypes'

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            if (state.some(el => el === action.payload))
                return state
            else
                return state.concat(action.payload)
        case ActionTypes.POST_FAVORITES:
        default:
            return state
    }
}