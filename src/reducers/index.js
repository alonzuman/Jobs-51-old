import { combineReducers } from 'redux';
import { alertReducer } from './alert'
import { authReducer } from './auth';
import { jobsReducer } from './jobs';
import { themeReducer } from './theme';
import { dialogsReducer } from './dialogs';
import { activitiesReducer } from './activities';
import { usersReducer } from './users';
import { feedbackReducer } from './feedback';

export default combineReducers({
  alerts: alertReducer,
  feedback: feedbackReducer,
  auth: authReducer,
  jobs: jobsReducer,
  theme: themeReducer,
  dialogs: dialogsReducer,
  activities: activitiesReducer,
  users: usersReducer
});
