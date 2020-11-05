import { Button, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageSection from './PageSection'

const LoadMoreButton = ({ loading, list, last, action, query, noMoreResults }) => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(action(query, last))
  }

  if (list?.length >= 10 && !noMoreResults) {
    return (
      <PageSection className='flex align__center justify__center'>
        <Button size='large' onClick={handleClick}>{loading ? <CircularProgress color='primary' className='button-spinner primary__color' /> : translation.loadMore}</Button>
      </PageSection>
    )
  } else if (list?.length !== 0 && noMoreResults) {
    return (
      <PageSection className='flex align__center justify__center'>
        <Typography variant='body1'>{translation.noMoreResults}</Typography>
      </PageSection>
    )
  } else {
    return null;
  }
}

export default LoadMoreButton