import React, {useEffect, useState} from 'react';
import {Card, Image} from 'semantic-ui-react';

const ITUNES_URL = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"

const MainPageComponent = () => {
  const [allPodcasts, setAllPodcasts] = useState()

  useEffect(() => {
    async function fetchPodcasts() {
      const {feed: {entry: podcasts}} = await fetch(ITUNES_URL).then((response) => response.json())
      const mappedPodcasts = podcasts.map(item => {
        return {
          id: item.id.attributes["im:id"],
          author: item["im:name"].label,
          song: item.title.label,
          image: item["im:image"][2].label || item["im:image"][0].label,
        };
      });
      setAllPodcasts(mappedPodcasts)
    }
    fetchPodcasts()
  }, [])

  return (
    <Card.Group>
      {allPodcasts?.map(podcast => {
        return (
          <Card key={podcast.id}>
            <Image src={podcast.image} wrapped ui={false} />
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

export default MainPageComponent;
