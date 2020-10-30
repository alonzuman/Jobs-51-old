import { Divider, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'

// Icons
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationSelect from '../../../components/forms/profile/LocationSelect'
import InfoContainer from './InfoContainer'
import PageSection from '../../../v2/atoms/PageSection';

const UserPageBio = ({ editing, loading, user, hometown, setHometown, phone, setPhone, about, setAbout }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton width={104} height={18} />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        <Divider />
        <Typography className='mb-1 mt-2' variant='h2'>{translation.aboutMe}</Typography>
        <TextField className='mt-1' size='small' multiline rows={4} variant='outlined' label={translation.aboutMe} value={about} onChange={e => setAbout(e.target.value)} />
        <ListItem>
          <ListItemIcon>
            <PhoneIcon className='ml-1 mb-5 small__icon' />
          </ListItemIcon>
          <TextField size='small' variant='outlined' label={translation.phone} value={phone} onChange={e => setPhone(e.target.value)} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationCityIcon className='ml-1 mb-5 small__icon' />
          </ListItemIcon>
          <LocationSelect size='small' location={hometown} setLocation={setHometown} className='mw-224' label={translation.hometown} />
        </ListItem>
      </PageSection>
    )
  } else if (user?.about || user?.hometown || user?.phone || user?.email) {
    return (
      <PageSection>
        <Divider />
        <Typography className='mt-2' variant='h2'>{translation.aboutMe}</Typography>
        <Typography className='text__wrap mb-1' variant='body1'>{user?.about}</Typography>
        <List>
          {user?.email &&
            <ListItem>
              <ListItemIcon>
                <MailIcon className='small__icon' />
              </ListItemIcon>
              <ListItemText>
                {user?.email}
              </ListItemText>
            </ListItem>}
          {user?.phone &&
            <ListItem>
              <ListItemIcon>
                <PhoneIcon className='small__icon' />
              </ListItemIcon>
              <ListItemText>
                {user?.phone}
              </ListItemText>
            </ListItem>}
          {user?.hometown &&
            <ListItem>
              <ListItemIcon>
                <LocationCityIcon className='small__icon' />
              </ListItemIcon>
              <ListItemText>
                {user?.hometown}
              </ListItemText>
            </ListItem>}
        </List>
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageBio
