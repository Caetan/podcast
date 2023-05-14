import React from 'react';
import {Card, Image} from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import {getFilteredPodcasts} from '../../redux/selectors';

const PodcastListComponent = () => {
  const podcasts = useSelector(getFilteredPodcasts);

  return (
    <Card.Group>
      {podcasts?.map(podcast => {
        return (
          <Card key={podcast.id} href={`/podcast/${podcast.id}`}>
            <Image src={podcast.image} wrapped ui={false} alt="Album cover" />
            <Card.Content>
              <Card.Header>{podcast.song}</Card.Header>
              <Card.Description>Author: {podcast.author}</Card.Description>
            </Card.Content>
          </Card>
        )
      })
      }
    </Card.Group>
  );
};

export default PodcastListComponent;
