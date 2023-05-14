import React from 'react';
import {Grid, Card} from 'semantic-ui-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const PodcastPlayComponent = () => {
  const episode = JSON.parse(localStorage.getItem('episode'))
  return (
    <Grid.Column width={11}>
      <Card fluid>
        <Card.Content>
          <Card.Description>
            {episode.shortDescription}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <AudioPlayer
            autoPlay
            src={episode.episodeUrl}
          />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default PodcastPlayComponent;
