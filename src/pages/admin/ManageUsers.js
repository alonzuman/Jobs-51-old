import React from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import BackButton from '../../components/layout/BackButton'
import { Typography, Box, Grid, Chip } from '@material-ui/core'
import UsersList from '../../components/lists/UsersList'
import SearchBar from '../../components/filters/SearchBar'
import { clearUserFilters } from '../../actions/users'

const ManageUsers = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

  const boxStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const listBoxStyle = {
    marginTop: '6.5rem',
    marginBottom: '4rem',
    padding: '1rem'
  }

  const filtersContainerStyle = {
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'space-between'
  }

  const clearStyle = {
    backgroundColor: 'transparent',
    border: 'none'
  }

  return (
    <>
      <TopBar>
        <Box style={boxStyle}>
          <BackButton />
          <Typography variant='h1'>{translation.manageUsers}</Typography>
        </Box>
        <Box style={filtersContainerStyle}>
          <Grid container spacing={1}>
            <Grid item><SearchBar /></Grid>
          </Grid>
          <Chip style={clearStyle} onClick={() => dispatch(clearUserFilters())} label={translation.clear} />
        </Box>
      </TopBar>
      <Box style={listBoxStyle}>
        <UsersList />
      </Box>
    </>
  )
}

export default ManageUsers
