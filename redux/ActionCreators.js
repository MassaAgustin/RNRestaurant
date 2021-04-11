import * as ActionTypes from './ActionTypes'

import { baseUrl } from '../shared/baseUrl'

export const fetchComments = () => dispatch => {

    fetch(`${baseUrl}comments`)
        .then(res => {
            if (res.ok) {
                return res
            } else {
                var error = new Error(`Error ${res.status}: ${res.statusText}`)
                error.response = response
                throw error
            }
        },
            err => {
                var errorMessage = new Error(err.message)
                throw errorMessage
            })
        .then(res => { return res.json() })
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMessage
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchDishes = () => dispatch => {

    dispatch(dishesLoading())

    fetch(`${baseUrl}dishes`)
        .then(res => {
            if (res.ok) {
                return res
            } else {
                var error = new Error(`Error ${res.status}: ${res.statusText}`)
                error.response = response
                throw error
            }
        },
            err => {
                var errorMessage = new Error(err.message)
                throw errorMessage
            })
        .then(res => { return res.json() })
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMessage
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchPromos = () => dispatch => {

    dispatch(promosLoading())

    fetch(`${baseUrl}promotions`)
        .then(res => {
            if (res.ok) {
                return res
            } else {
                var error = new Error(`Error ${res.status}: ${res.statusText}`)
                error.response = response
                throw error
            }
        },
            err => {
                var errorMessage = new Error(err.message)
                throw errorMessage
            })
        .then(res => { return res.json() })
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMessage
})

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
})

export const fetchLeaders = () => dispatch => {

    dispatch(leadersLoading())

    fetch(`${baseUrl}leaders`)
        .then(res => {
            if (res.ok) {
                return res
            } else {
                var error = new Error(`Error ${res.status}: ${res.statusText}`)
                error.response = response
                throw error
            }
        },
            err => {
                var errorMessage = new Error(err.message)
                throw errorMessage
            })
        .then(res => { return res.json() })
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errMessage) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMessage
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const postFavorites = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId))
    }, 2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: dishId
})