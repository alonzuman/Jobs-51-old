import React, { useState, useEffect } from 'react'
import { Card, CardHeader, IconButton, Grid, CardContent, Typography, Avatar, Chip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { openEditingJob, setJob, savedJob, unsaveJob } from '../../actions'
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const JobCard = ({ job }) => {
  const { uid, authenticated, savedJobs } = useSelector(state => state.auth)
  const [saved, setSaved] = useState()
  const dispatch = useDispatch()
  const { translation, direction } = useSelector(state => state.theme)

  const isSaved = () => savedJobs.includes(job.id)

  useEffect(() => { isSaved() }, [savedJobs])

  const handleClick = () => {
    dispatch(openEditingJob())
    dispatch(setJob(job))
  }

  const favoriteIconStyle = {
    color: 'red'
  }


  const handleClickFavorite = () => {
    if (saved) {
      setSaved(false)
      dispatch(unsaveJob(uid, job.id))
    } else {
      setSaved(true)
      dispatch(savedJob(uid, job.id))
    }
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card style={{ direction }}>
        <CardHeader
          avatar={<Avatar src={job?.image} alt={job?.company}>{job?.company[0].toUpperCase()}</Avatar>}
          title={job?.company}
          subheader={job?.location}
          action={job?.uid === uid ?
          <IconButton onClick={handleClick}><EditIcon /></IconButton>:
          authenticated ? <IconButton onClick={handleClickFavorite}>{saved ? <FavoriteIcon style={favoriteIconStyle} /> : <FavoriteBorderIcon />}</IconButton> : null}
        />
        <CardContent>
          <Typography variant='body1'>{translation.type}</Typography>
          <Typography variant='body1'>{job?.type}</Typography>
          <Typography variant='body1'>{translation.description}</Typography>
          <Typography variant='body1'>{job?.description}</Typography>
          <Typography variant='body1'>{translation.requirements}</Typography>
          <Grid container spacing={1}>
            {job?.requirements?.map((req, index) => <Grid item key={index}><Chip label={req} /></Grid>)}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default JobCard
