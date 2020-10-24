import React from 'react'
import PageSection from '../../../v2/atoms/PageSection'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

// Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const StatsList = styled.ul`
  padding: 0;
`

const StatItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const ActivityPageStats = ({ loading, pending, approved, region }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton className='mt-1' variant='text' height={32} width={64} />
        <Skeleton variant='text' className='mb-1' width={124} height={16} />
        <Skeleton variant='text' className='mb-1' width={80} height={24} />
        <Skeleton variant='text' className='mb-1' width={96} height={24} />
      </PageSection>
    )
  } else if (region) {
    return (
      <PageSection>
        <Typography variant='h2'>{translation.general}</Typography>
        {region && <Typography variant='subtitle1'>{translation.totalActivitiesInRegion} {region}</Typography>}
        <StatsList>
          <StatItem>
            <CheckCircleOutlineIcon className='medium__icon ml-5' />
            <Typography variant='body1'>{translation.approved} {approved.toFixed(1)}</Typography>
          </StatItem>
          <StatItem>
            <HighlightOffIcon className='medium__icon ml-5' />
            <Typography variant='body1'>{translation.pending} {pending.toFixed(1)}</Typography>
          </StatItem>
        </StatsList>
      </PageSection>
    )
  } else {
    return null;
  }
}

export default ActivityPageStats