import React from 'react';
import {Grid} from 'semantic-ui-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const PodcastPlayComponent = () => {
  const episode = JSON.parse(localStorage.getItem('episode'))
  console.log(episode)
  return (
    <Grid.Column width={11}>
      <Grid.Row>
        {episode.shortDescription}
      </Grid.Row>
      <Grid.Row>
        <AudioPlayer
          autoPlay
          src={episode.episodeUrl}
          style={{width: "80%"}}
        />
      </Grid.Row>
    </Grid.Column>
  );
};

export default PodcastPlayComponent;
