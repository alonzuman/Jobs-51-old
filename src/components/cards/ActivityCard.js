import React, { useState } from 'react'
import { ListItem, ListItemText, Chip, Box, Typography, Paper, IconButton, Grid } from '@material-ui/core'
import { translateDate, activityTypeColor } from '../../utils'
import { useSelector } from 'react-redux'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ActivityCardActions from './ActivityCardActions';
import CardContainer from './CardContainer';
import CustomChip from './CustomChip';

const ActivityCard = ({ activity }) => {
  const [open, setOpen] = useState(false)
  const { theme, translation } = useSelector(state => state.theme)
  const paperStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    display: 'flex'
  }

  const dateStyle = {
    borderLeft: `1px solid ${theme.palette.border.main}`,
    textAlign: 'center',
    padding: '0 1rem',
    margin: '1rem 0',
    minWidth: 72
  }

  const detailsStyle = {
    padding: '1rem 1rem 1rem 0',
    width: '100%'
  }

  const actionBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconStyle = {
    transform: open ? 'rotate(-90deg)' : 'none',
    transition: '.15s transform ease-in-out'
  }

  const chipStyle = {
    color: activityTypeColor(activity.type),
    border: `1px solid ${activityTypeColor(activity.type)}`
  }

  const [day, month, number] = translateDate(activity.date)
  return (
    <>
    <Grid item xs={12} md={6} lg={4}>
      <ListItem className='br-1' onClick={() => setOpen(!open)} button>
        <CardContainer>
          <Paper style={paperStyle} elevation={0}>
            <Box style={dateStyle}>
              <Typography variant='subtitle1'>{month}</Typography>
              <Typography variant='h2'>{number}</Typography>
              <Typography variant='body1'>{day}</Typography>
            </Box>
            <Box style={detailsStyle}>
              <CustomChip label={activity.type} size='small' variant='outlined' style={chipStyle} />
              <ListItemText
                primary={activity.description}
                secondary={activity.total}
              />
            </Box>
            <Box style={actionBoxStyle}>
              <IconButton style={iconStyle} onClick={() => setOpen(!open)}>
                <ChevronLeftIcon />
              </IconButton>
            </Box>
          </Paper>
        </CardContainer>
      </ListItem>
      {open && <ActivityCardActions activity={activity} />}
    </Grid>
    </>
  )
}

export default ActivityCard
