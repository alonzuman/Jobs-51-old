import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import Container from '../../components/atoms/Container'
import PageSection from '../../components/atoms/PageSection'
import JobsList from '../../components/molecules/JobsList'
import PageHeader from '../../components/organisms/PageHeader'

const Saved = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { uid } = match.params
  const { loading, savedJobs, currentUid } = useSelector(state => state.jobs)
  const dispatch = useDispatch()

  useEffect(() => {
    if (uid !== currentUid) {
      dispatch(getSavedJobs(uid))
    }
  }, [])

  return (
    <Container>
      <PageSection>
        <PageHeader backButton title={translation.savedJobs} loading={loading} />
      </PageSection>
      <JobsList loading={loading} jobs={savedJobs} />
    </Container>
  )
}

export default Saved
