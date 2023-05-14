import React from 'react';
import PodcastComponent from '../components/Podcast/PodcastComponent';
import {Container} from 'semantic-ui-react';


const PodcastPage = () => {
  return (
    <Container style={{padding: "2rem"}}>
      <PodcastComponent />
    </Container>
  );
};

export default PodcastPage;
