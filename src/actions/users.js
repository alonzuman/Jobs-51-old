import store from "../store"
import { db } from "../firebase"
import { setAlert } from "./alert"
import { capitalizeFirstLetter } from "../utils"
const usersRef = db.collection('users')

export const getUsers = () => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  const { filters } = store.getState().users
  try {
    let snapshot
    if (filters.search) {
      snapshot = await usersRef.where('firstName', '==', capitalizeFirstLetter(filters.search)).get()
    } else {
      snapshot = await usersRef.get()
    }
    let users = []
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_USERS',
      payload: { users }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const setUserFilters = (filter) => async dispatch => {
  dispatch({
    type: 'SET_USERS_FILTER',
    payload: { filter }
  })
}

export const clearUserFilters = () => async dispatch => {
  dispatch({
    type: 'CLEAR_USERS_FILTERS'
  })
}
