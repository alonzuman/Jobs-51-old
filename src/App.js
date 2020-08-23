import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper, Dialog } from '@material-ui/core'
import { setTheme } from './actions'
import jss from 'jss'

// Redux
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './ProtectedRoute'
import RtlProvider from './contexts/RtlContext'
import SavedJobs from './components/dialogs/SavedJobs'
import Navbar from './components/layout/Navbar'
import EditProfile from './components/forms/EditProfile'


function App() {
  const { authenticated } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.theme)

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = localStorage.getItem('theme') === 'dark' ? '#303030' : '#efefef'
    setTheme()
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <RtlProvider>
        <Router>
          <Dialogs />
          <CustomAlert />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <ProtectedRoute exact path='/results/jobs' component={Jobs} />
            <ProtectedRoute exact path='/results/users' component={Employees} />
            <ProtectedRoute exact path='/saved-jobs' component={SavedJobs} />
            <ProtectedRoute exact path='/my-profile' component={EditProfile} />
          </Switch>
          {authenticated && <Navbar />}
        </Router>
      </RtlProvider>
  </ThemeProvider>
  )
}

export default App;
