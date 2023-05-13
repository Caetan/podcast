import React, {useState, useEffect} from 'react';
import {Header} from 'semantic-ui-react';
import { useParams } from 'react-router';

const PODCAST_DETAILS = "https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id="

const PodcastComponent = () => {
  const {podcastId} = useParams();
  const [podcastDetails, setPodcastDetails] = useState();

  useEffect(() => {
    async function fetchPodcastDetails() {
      const data = await fetch(`${PODCAST_DETAILS}${podcastId}`).then((response) => response.json())
      setPodcastDetails(data)
    }
    fetchPodcastDetails()
  }, [])

  return (
    <Header>
      SOMETHING
    </Header>
  );
};

export default PodcastComponent;
