import {SET_ALL_PODCASTS, SET_FILTERED_PODCASTS} from '../actionTypes';

const podcastsReducer = (store = [], action) => {
  switch (action.type) {
    case SET_ALL_PODCASTS: {
      return {
        ...store,
        allPodcasts: action.payload,
      };
    }
    case SET_FILTERED_PODCASTS: {
      return {
        ...store,
        filteredPodcasts: action.payload,
      };
    }
    default: {
      return store;
    }
  }
};

export default podcastsReducer;
