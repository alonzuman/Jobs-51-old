import { Chip, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import SkillsSelect from '../../../components/forms/profile/SkillsSelect'
import WorkIcon from '@material-ui/icons/Work';
import InfoContainer from './InfoContainer'
import GradeIcon from '@material-ui/icons/Grade';
import PageSection from '../../../v2/atoms/PageSection'
import useWindowSize from '../../../hooks/useWindowSize'

const UserPageJobInfo = ({ user, editing, loading, lastPosition, setLastPosition, skills, setSkills }) => {
  const { translation } = useSelector(state => state.theme)
  const { windowWidth } = useWindowSize()


  if (loading) {
    return (
      <PageSection>
        <Skeleton width={104} height={18} />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection spaceBottom={windowWidth < 768}>
        <Divider />
        <Typography className='mb-1 mt-1' variant='h2'>{translation.workExperience}</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <WorkIcon className='small__icon' />
            </ListItemIcon>
            <TextField className='fit__content mb-5' size='small' label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GradeIcon className='small__icon' />
            </ListItemIcon>
            <SkillsSelect skills={skills} setSkills={setSkills} className='mw-224' size='small' />
          </ListItem>
        </List>
      </PageSection>
    )
  } else if (user?.lastPosition && user?.skills?.length !== 0) {
    return (
      <PageSection>
        <Divider />
        <Typography className='mt-1' variant='h2'>{translation.workExperience}</Typography>
        <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <WorkIcon className='small__icon' />
            </ListItemIcon>
            <ListItemText>
              {user?.lastPosition}
            </ListItemText>
          </ListItem>
          {user?.skills?.length !== 0 && <Typography className='mb-5' variant='subtitle1'>{translation.skillsInterestedIn}</Typography>}
          <ListItem>
            <Grid container spacing={1}>
              {user?.skills?.map((v, i) => <Grid item key={i}><Chip label={v} color='primary' variant='outlined' size='small' /></Grid>)}
            </Grid>
          </ListItem>
        </List>
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageJobInfo
