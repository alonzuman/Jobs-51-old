import React, { useState } from 'react'
import { ListItemText, Typography, Avatar, Chip, ListItemAvatar, ListItem, ListItemSecondaryAction, Divider } from '@material-ui/core'
import { translateDate, checkPermissions } from '../../utils'
import { useSelector } from 'react-redux'
import ActivityCardActions from './ActivityCardActions';
import { Link } from 'react-router-dom';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import styled from 'styled-components';

const ListItemBody = styled.div`
  display: flex;
  flex-direction: column;
`

const TimeContainer = styled.div`
  display: flex;
`

const ActivityCard = ({ activity }) => {
  const [open, setOpen] = useState(false)
  const { approved, description, total, user, type } = activity
  const [isApproved, setIsApproved] = useState(!!approved)
  const { translation } = useSelector(state => state.theme)
  const { role, uid } = useSelector(state => state.auth)
  const [day, month, number] = translateDate(activity.date)
  const isAdmin = checkPermissions(role) >= 3;
  const isUser = uid === activity?.uid;

  const handleApproved = () => setIsApproved(!isApproved)
  const handleActionsOpen = () => setOpen(!open)

  return (
    <>
      <ListItem alignItems='flex-start' button onClick={handleActionsOpen}>
        <Link to={`/users/${activity?.uid}`}>
          <ListItemAvatar>
            <Avatar src={user?.avatar}>{user?.firstName.charAt(0)}</Avatar>
          </ListItemAvatar>
        </Link>
        <ListItemText
          primary={`${translation.day} ${day}, ${number} ${translation.in}${month}`}
          secondary={
            <ListItemBody>
              <TimeContainer>
                <AccessTimeIcon className='extra_small__icon mt-25 ml-25' />
                <Typography variant='subtitle1'>
                  {total} {translation.hours}, {type}
                </Typography>
              </TimeContainer>
              <Typography variant='subtitle1'>
                {description}
              </Typography>
            </ListItemBody>
          }
        />
        <ListItemSecondaryAction style={{ top: 24 }}>
          <Chip
            size='small'
            variant='outlined'
            color={isApproved ? 'primary' : ''}
            label={isApproved ? translation.approved : translation.pending}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {open && (isAdmin || isUser) && <ActivityCardActions handleApproved={handleApproved} className='mt-5' activity={activity} />}
      <Divider />
    </>
  );
}

export default ActivityCard