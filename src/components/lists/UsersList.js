import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import UserCard from '../cards/UserCard'
import CardsSkeletons from '../cards/CardsSkeletons'
import { getUsers } from '../../actions/users'

const UsersList = () => {
  const { loading, users, filters } = useSelector(state => state.users)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUsers()) }, [filters])

  if (loading) {
    return <CardsSkeletons count={5} />
  } else if (!loading && users) {
    return (
      <Grid container spacing={2}>
        {users?.map((user, index) => <UserCard key={index} user={user} />)}
      </Grid>
    )
  } else {
    return <Typography variant='body1'>{translation.usersEmptyState}</Typography>
  }

}

export default UsersList