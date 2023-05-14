import React, {useEffect} from 'react';
import PodcastListComponent from '../components/MainPage/PodcastListComponent';
import {Grid} from 'semantic-ui-react';
import SearchComponent from '../components/MainPage/SearchComponent';

import store from '../redux/store';
import {SET_ALL_PODCASTS, SET_FILTERED_PODCASTS} from '../redux/actionTypes';

const ITUNES_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"


const MainPage = () => {

  useEffect(() => {
    async function fetchPodcasts() {
      const {feed: {entry: podcasts}} = await fetch(ITUNES_URL).then((response) => response.json())
      const mappedPodcasts = podcasts?.map(item => {
        return {
          id: item.id.attributes["im:id"],
          author: item["im:name"].label,
          song: item.title.label,
          image: item["im:image"][2].label || item["im:image"][0].label,
        };
      });
      store.dispatch({type: SET_ALL_PODCASTS, payload: mappedPodcasts})
      store.dispatch({type: SET_FILTERED_PODCASTS, payload: mappedPodcasts})
    }
    fetchPodcasts()
  }, [])

  return (
    <Grid style={{padding: "2rem"}} centered>
      <SearchComponent />
      <Grid.Row>
        <PodcastListComponent />
      </Grid.Row>
    </Grid>
  );
};

export default MainPage;
