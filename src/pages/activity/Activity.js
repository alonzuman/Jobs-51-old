import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import ActivitiesList from '../../components/lists/ActivitiesList'
import FloatingActionButton from '../../components/layout/FloatingActionButton'
import StatsList from '../../components/lists/StatsList'
import PageHeader from '../../v2/organisms/PageHeader'
import Container from '../../v2/atoms/Container'
import AddActivityDialog from '../../v2/layout/AddActivityDialog'
import PageSection from '../../v2/atoms/PageSection'

const Activity = () => {
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { pending, approved } = useSelector(state => state.auth).activities

  const statsListItems = [
    { label: translation.approved, big: approved.toFixed(1), marker: "#4caf50" },
    { label: translation.pending, big: pending.toFixed(1), marker: "#e15757" },
  ];

  const handleAddActivity = () => setAddingActivity(true)

  return (
    <Container>
      <FloatingActionButton color='primary' action={handleAddActivity} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <AddActivityDialog open={addingActivity} onClose={() => setAddingActivity(false)} />
      <PageSection>
        <PageHeader spaceTop title={translation.activity} />
        <Typography variant='h3'>{translation.totalActivities}</Typography>
        <StatsList items={statsListItems} />
        <Typography variant='h3'>{translation.latestActivities}</Typography>
        <ActivitiesList type='personal' />
      </PageSection>
    </Container>
  )
}

export default Activity
