import React, {useState, useEffect} from 'react';
import {Grid, Card, Image, Label, Table, Header, Loader, Dimmer} from 'semantic-ui-react';
import {useParams} from 'react-router';
import XMLParser from 'react-xml-parser';

import styles from './PodcastComponent.module.css';


const PODCAST_DETAILS = "https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id="


function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60000);
  const minutes = totalMinutes % 60;

  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}

function padToTwoDigits(num) {
  return num.toString().padStart(2, '0');
}

const PodcastComponent = () => {
  const {podcastId} = useParams();
  const [podcastDetails, setPodcastDetails] = useState();
  const [episodes, setEpisodes] = useState();
  const [podcastDescription, setPodcastDescription] = useState();

  useEffect(() => {
    async function fetchPodcastDetails() {
      const basicInfo = await fetch(`${PODCAST_DETAILS}${podcastId}`).then((response) => response.json()).then(podcast => podcast?.results[0])
      setPodcastDetails(basicInfo)
      // Max limit is 200 per request
      const {results: episodes} = await fetch(`${PODCAST_DETAILS}${podcastId}%26entity=podcastEpisode%26limit=${basicInfo.trackCount}`).then((response) => response.json())
      setEpisodes(episodes)
      // Very slow call
      const {children: moreInfo} = await fetch(`https://api.allorigins.win/raw?url=${basicInfo?.feedUrl}`).then(res => res.text())
        .then(data => {
          return new XMLParser().parseFromString(data);
        })
      setPodcastDescription(moreInfo[0]?.children.find(x => {return x.name === "description"})?.value)
    }
    fetchPodcastDetails()
  }, [podcastId])

  const trackCount = podcastDetails?.trackCount

  return (
    <Grid columns={2}>
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
      <Grid.Column width={11}>
        <Label className={styles.box} size='massive'>Episodes: {trackCount}</Label>
        {!episodes ? (
          <Dimmer active inverted>
            <Loader>Loading episodes</Loader>
          </Dimmer>
        ) : (
          <Grid.Row className={styles.box}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={10}>Title</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Duration</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {episodes?.map(episode => {
                const title = episode.trackName || "Unavailable"
                const date = formatDate(episode.releaseDate)
                const duration = toHoursAndMinutes(episode.trackTimeMillis)
                return (
                  <Table.Body key={`${date}${title}`}>
                    <Table.Row>
                      <Table.Cell width={10}>{title}</Table.Cell>
                      <Table.Cell width={3}>{date}</Table.Cell>
                      <Table.Cell width={3}>{duration}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })}
            </Table>
          </Grid.Row>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PodcastComponent;
