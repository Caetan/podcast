import { configureStore } from '@reduxjs/toolkit'
import podcastsReducer from './reducers/podcastsReducer'

export default configureStore({
  reducer: {podcastsReducer},
})