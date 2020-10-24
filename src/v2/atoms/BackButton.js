import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

const BackButton = ({ className }) => {
  const history = useHistory()
  const handleClick = () => history.goBack()

  return (
    <IconButton className={className} size='small' onClick={handleClick}>
      <KeyboardArrowRightIcon />
    </IconButton>
  )
}

export default BackButton