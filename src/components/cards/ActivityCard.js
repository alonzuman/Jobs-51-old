import React, { useState } from 'react'
import { ListItem, ListItemText, Box, Typography, Paper, IconButton, Grid, Avatar, CardActions, CardContent, Card } from '@material-ui/core'
import { translateDate, activityTypeColor, checkPermissions } from '../../utils'
import { useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ActivityCardActions from './ActivityCardActions';
import CardContainer from './CardContainer';
import CustomChip from './CustomChip';
import { Link } from 'react-router-dom';
import CardMarker from './CardMarker';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import styled from 'styled-components';

const IconButtonContainer = styled.div`
  transform: ${props => props.open ? 'rotate(-180deg)' : 'none'};
  transition: .15s ease-in-out transform;
`

const DatesContainer = styled.div`
  border-left: 1px solid ${props => props.borderColor};
  text-align: center;
  padding-left: 16px;
  min-width: 72px;
`

const InfoContainer = styled.div`
  padding: 0px 16px;
`

const CardBody = styled.div`
  display: flex;
  cursor: pointer;
`

const ActivityCard = ({ activity, showUser = true }) => {
  const [open, setOpen] = useState(false)
  const { theme } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)

  const chipStyle = {
    color: activityTypeColor(activity.type),
    border: `1px solid ${activityTypeColor(activity.type)}`
  }

  const [day, month, number] = translateDate(activity.date)
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card onClick={() => setOpen(!open)}>
        <CardContent>
          <CardBody>
            <DatesContainer borderColor={theme?.palette?.border?.main}>
              {/* <CardMarker color={activity.approved ? "#4caf50" : "#e15757"} /> */}
              <Typography variant="subtitle1">{month}</Typography>
              <Typography variant="h2">{number}</Typography>
              <Typography variant="body1">{day}</Typography>
            </DatesContainer>
            <InfoContainer>
              <CustomChip
                label={activity.type}
                size="small"
                variant="outlined"
                style={chipStyle}
              />
              <ListItemText
                primary={activity.description}
                secondary={<span className='flex align__center'><AccessTimeIcon style={{ height: '.75rem', width: '.75rem', marginLeft: '.25rem', marginBottom: '.1rem' }} />{activity.total}</span>}
              />
            </InfoContainer>
            {showUser && (
              <Link to={checkPermissions(role) >= 3 && `/users/${activity.uid}`}>
                <Box className='flex align__center justify__center flex__column p-1 mw-80' style={{ minWidth: 80 }}>
                  <Avatar src={activity?.user?.avatar} />
                  <Typography style={{ marginTop: '.25rem', textAlign: "center" }} variant="subtitle1" >
                    {activity?.user?.firstName} {activity?.user?.lastName}
                  </Typography>
                </Box>
              </Link>)}
          </CardBody>
        </CardContent>
        <CardActions className='flex align__center justify__center pt-0'>
          <IconButtonContainer open={open}>
            <IconButton size='small' onClick={() => setOpen(!open)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </IconButtonContainer>
        </CardActions>
      </Card>
      {open && <ActivityCardActions style={{ marginTop: '.5rem' }} activity={activity} />}
    </Grid>
  );
}

export default ActivityCard
