import React from 'react';
import {Grid, Card, Image, Header, Loader, Dimmer} from 'semantic-ui-react';


const PodcastInfoComponent = ({podcastDescription, podcastDetails}) => {

  return (
    <Grid.Column width={5}>
      {!podcastDetails ? (
        <Dimmer active inverted>
          <Loader>Loading details</Loader>
        </Dimmer>
      ) : (
        <Card>
          <Image src={podcastDetails?.artworkUrl600} wrapped ui={false} alt="Album cover" />
          <Card.Content>
            <Card.Header>{podcastDetails?.collectionName}</Card.Header>
            <Card.Description>By {podcastDetails?.artistName}</Card.Description>
          </Card.Content>
          <Card.Content extra style={{wordBreak: "break-all"}}>
            <Header as="h4">Description:</Header>
            {!podcastDescription ? (
              <Dimmer active inverted>
                <Loader>Loading info</Loader>
              </Dimmer>
            ) :
              podcastDescription
            }
          </Card.Content>
        </Card>
      )}
    </Grid.Column>
  );
};

export default PodcastInfoComponent;
