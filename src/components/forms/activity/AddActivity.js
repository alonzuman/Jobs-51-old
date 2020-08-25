import React, { useState, useEffect } from 'react'
import { Button, TextField, Grid, Chip, Typography, CircularProgress } from '@material-ui/core'
import { addActivity, getActivityTypes } from '../../../actions/activities'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../../actions/alert';
import { calcHours } from '../../../utils';

const AddActivity = () => {
  const { uid } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { loading, types } = useSelector(state => state.activities)
  const [activity, setActivity] = useState({
    type: '',
    description: '',
    date: '2020-08-10',
    startHour: '10:00',
    endHour: '17:30',
    approved: false,
    uid
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActivityTypes())
  }, [])

  const handleChange = e => {
    const totalHours = calcHours(activity['startHour'], activity['endHour'], activity['date'])
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
      ['total']: totalHours
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const totalHours = calcHours(activity['startHour'], activity['endHour'], activity['date'])
    if (activity['type'].trim().length === 0) {
      return dispatch(setAlert({
        type: 'error',
        msg: 'fillActivityType'
      }))
    } else if (activity['startHour'] > activity['endHour']) {
      return dispatch(setAlert({
        type: 'error',
        msg: 'hoursNoGood'
      }))
    }
    dispatch(addActivity(activity))
  }

  return (
    <form onSubmit={handleSubmit}>
      {!types && <CircularProgress />}
      {types &&
      <>
        <Typography variant='body1'>{translation.type}</Typography>
        <Grid container spacing={1}>
          {types?.map((type, index) => <Grid key={index} item ><Chip onClick={() => setActivity({ ...activity, type })} label={type} color={activity['type'] === type ? 'primary' : 'default'} /></Grid>)}
        </Grid>
        <br />
        <TextField required label={translation.description} variant='outlined' name='description' value={activity['description']} onChange={handleChange} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField InputLabelProps={{shrink: true}} type='time' required label={translation.startHour} variant='outlined' name='startHour' value={activity['startHour']} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField InputLabelProps={{ shrink: true }} type='time' required label={translation.endHour} variant='outlined' name='endHour' value={activity['endHour']} onChange={handleChange} />
          </Grid>
        </Grid>
        <TextField InputLabelProps={{ shrink: true }} type='date' required label={translation.date} variant='outlined' name='date' value={activity['date']} onChange={handleChange} />
        <Button className='button-style' color='primary' variant='contained' type='submit' >{loading ? <CircularProgress className='button-spinner' /> : translation.addActivity}</Button>
      </>}
    </form>
  )
}

export default AddActivity