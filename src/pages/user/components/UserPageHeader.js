import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { checkPermissions } from '../../../utils';
import { useSelector } from 'react-redux';
import { Avatar, IconButton, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import PageSection from '../../../v2/atoms/PageSection';

const ActionsWrapper = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const FlexFields = styled.div`
  display: flex;
`

const UserPageHeader = ({
  editing,
  stateFirstName,
  stateLastName,
  stateAvatar,
  setAvatar,
  stateServiceYear,
  setServiceYear,
  setLastName,
  setFirstName,
  loading,
  user,
  handleEditing,
  handleImageOpen
}) => {
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { avatar, firstName, lastName, serviceYear } = user

  const canEdit = (checkPermissions(role) >= checkPermissions(user?.role) && checkPermissions(user?.role) !== 0)

  if (loading) {
    return (
      <PageSection>
        <PageHeader
          title={<Skeleton width={104} />}
          subtitle={<Skeleton width={48} />}
          secondary={<Skeleton variant='circle' height={56} width={56} />}
        />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        <ActionsWrapper>
          <Typography className='p-0 lh-0' variant='h2'>{translation.editUser}</Typography>
          <IconButton size='small' onClick={handleEditing}>{<CloseIcon />}</IconButton>
        </ActionsWrapper>
        <ItemsWrapper>
          <FlexFields>
            <TextField className='mxw-196 ml-5' size='small' label={translation.editFirstName} variant='outlined' value={stateFirstName} onChange={e => setFirstName(e.target.value)} />
            <TextField className='mxw-196' size='small' label={translation.editLastName} variant='outlined' value={stateLastName} onChange={e => setLastName(e.target.value)} />
          </FlexFields>
          <TextField className='mxw-256' size='small' label={translation.serviceYear} variant='outlined' value={stateServiceYear} onChange={e => setServiceYear(e.target.value)} />
        </ItemsWrapper>
      </PageSection>
    )
  } else {
    return (
      <PageSection>
        <PageHeader
          backButton={!editing}
          imgUrl={user?.avatar}
          title={`${firstName} ${lastName}`}
          subtitle={serviceYear ? `${translation.serviceYear} ${serviceYear}` : ''}
          secondary={<Avatar onClick={handleImageOpen} className='avatar__md clickable' src={avatar}>{firstName?.charAt(0)}</Avatar>}
          action={canEdit && <IconButton size='small' onClick={handleEditing}>{editing ? <CloseIcon /> : <EditIcon />}</IconButton>}
        />
      </PageSection>
    )
  }
}

export default UserPageHeader
