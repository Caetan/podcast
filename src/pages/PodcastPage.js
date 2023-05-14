import React, {useEffect, useState} from 'react';
import PodcastComponent from '../components/Podcast/PodcastComponent';
import {useParams} from 'react-router-dom';
import PodcastInfoComponent from '../components/Podcast/PodcastInfoComponent';
import XMLParser from 'react-xml-parser';
import {Grid} from 'semantic-ui-react';
import PodcastPlayComponent from '../components/Podcast/PodcastPlayComponent';


const PODCAST_DETAILS = "https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id="

const PodcastPage = () => {
  const {podcastId, episodeId} = useParams();
  const [podcastDetails, setPodcastDetails] = useState();
  const [episodes, setEpisodes] = useState();
  const [podcastDescription, setPodcastDescription] = useState();

  useEffect(() => {
    async function fetchPodcastDetails() {
      const basicInfo = await fetch(`${PODCAST_DETAILS}${podcastId}`).then((response) => response.json()).then(podcast => podcast?.results[0])
      setPodcastDetails(basicInfo)
      // Max limit is 200 per request
      const {results: episodes} = await fetch(`${PODCAST_DETAILS}${podcastId}%26entity=podcastEpisode%26limit=${basicInfo.trackCount}`).then((response) => response.json())
      // First episode is not a real episode
      setEpisodes(episodes?.slice(1))
      // Very slow call
      const {children: moreInfo} = await fetch(`https://api.allorigins.win/raw?url=${basicInfo?.feedUrl}`).then(res => res.text())
        .then(data => {
          return new XMLParser().parseFromString(data);
        })
      setPodcastDescription(moreInfo[0]?.children.find(x => {return x.name === "description"})?.value)
    }
    fetchPodcastDetails()
  }, [podcastId])


  return (
    <Grid columns={2} style={{padding: "2rem"}}>
      <PodcastInfoComponent podcastDescription={podcastDescription} podcastDetails={podcastDetails} />
      {episodeId ?
        <PodcastPlayComponent />
      : <PodcastComponent podcastDetails={podcastDetails} episodes={episodes} />
    }
    </Grid>
  );
};

export default PodcastPage;
