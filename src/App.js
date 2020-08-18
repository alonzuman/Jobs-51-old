import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core'
import { setUser, setTheme } from './actions'
import { app } from './firebase'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MenuButton from './components/layout/MenuButton'
import LandingPage from './pages/LandingPage'


function App() {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const validateUser = () => {
    dispatch({
      type: 'AUTH_LOADING'
    })
    app.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch({
          type: 'NOT_SIGNED_IN'
        })
      }
    })
  }

  useEffect(() => { validateUser() }, [])

  const paperStyle = {
    borderRadius: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.background.paper || '#fff'
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={paperStyle}>
        <Router>
          <Dialogs />
          <CustomAlert />
          <MenuButton />
          <Switch>
            <Container>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/results' component={Home} />
              <ProtectedRoute path='/results/jobs' component={Jobs} />
              <Route path='/results/users' component={Employees} />
            </Container>
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, authenticated } = useSelector(state => state.auth)

    if (!loading && authenticated) {
      return <Route {...rest} render={props => <Route exact {...props} component={Component} />} />
    } else {
      return <Redirect to='/' />
    }
}

export default App;
