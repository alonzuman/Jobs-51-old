import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'
import SavedJobs from './components/dialogs/SavedJobs'
import Navbar from './components/layout/Navbar'
import EditProfile from './components/forms/EditProfile'
import Activity from './pages/Activity'
import Notifications from './pages/Notifications'
import Admin from './pages/Admin'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { setTheme } from './actions'

// Redux
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './ProtectedRoute'
import RtlProvider from './contexts/RtlContext'


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
            <ProtectedRoute exact path='/jobs' component={Jobs} />
            <ProtectedRoute exact path='/saved' component={SavedJobs} />
            <ProtectedRoute exact path='/activity' component={Activity} />
            <ProtectedRoute exact path='/notifications' component={Notifications} />
            <ProtectedRoute exact path='/profile' component={EditProfile} />
            <ProtectedRoute exact path='/users' component={Employees} />
            <ProtectedRoute exact path='/admin' component={Admin} />
          </Switch>
          {authenticated && <Navbar />}
        </Router>
      </RtlProvider>
    </ThemeProvider>
  )
}

export default App;
