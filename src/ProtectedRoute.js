import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { setUser, signOut } from './actions'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'
import { checkPermissions } from './utils'
import NoPermissions from './NoPermissions'
import NoPermissionPage from './NoPermissionPage'
import { getConstants } from './actions/constants'
import styled from 'styled-components'

const Container = styled.div`
  direction: rtl;
`

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true)
  const { isFetched } = useSelector(state => state.constants)
  const { role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser
  const { requiredRole } = rest

  useEffect(() => {
    if (!isFetched) {
      dispatch(getConstants())
    }
  }, [isFetched])


  useEffect(() => {
    dispatch({ type: 'AUTH_LOADING' })
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        setLoading(false)
      } else {
        dispatch(signOut())
        setLoading(false)
        return <Redirect to='/' />
      }
    })
  }, [dispatch])

  const checkRole = () => {
    if (requiredRole && currentUser) {
      const requirement =  checkPermissions(requiredRole)
      const currentUserRole = checkPermissions(role)
      return (currentUserRole >= requirement)
    } else {
      return true
    }
  }

  if (!loading && checkPermissions(role)  === 0) {
    return <NoPermissions />
  } else {
    return (
      <Container>
        {loading && <CircularSpinnerWithContainer />}
        {!loading && !checkRole() && <NoPermissionPage />}
        {!loading && currentUser && checkRole() && <Route {...rest} render={props => <Component {...props} />} />}
        {!loading && !currentUser && <Redirect to='/' />}
      </Container>
    )
  }
}

export default ProtectedRoute
