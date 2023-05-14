import React, {useState, useEffect} from 'react';
import {Grid, Card, Image, Label, Table, Header, Loader, Dimmer} from 'semantic-ui-react';
import {useParams} from 'react-router';
import XMLParser from 'react-xml-parser';

import styles from './PodcastComponent.module.css';


const PODCAST_DETAILS = "https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id="

const PodcastComponent = () => {
  const {podcastId} = useParams();
  const [podcastDetails, setPodcastDetails] = useState();
  const [podcastInfo, setPodcastInfo] = useState();

  useEffect(() => {
    async function fetchPodcastDetails() {
      const basicInfo = await fetch(`${PODCAST_DETAILS}${podcastId}`).then((response) => response.json()).then(podcast => podcast?.results[0])
      setPodcastDetails(basicInfo)
      const {children: moreInfo} = await fetch(`https://api.allorigins.win/raw?url=${basicInfo?.feedUrl}`).then(res => res.text())
        .then(data => {
          return new XMLParser().parseFromString(data);
        })
      setPodcastInfo(moreInfo[0]?.children)
    }
    fetchPodcastDetails()
  }, [podcastId])

  const trackCount = podcastDetails?.trackCount
  const albums = podcastInfo?.slice(podcastInfo?.length - trackCount, podcastInfo?.length)

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
            <Card.Content extra>
              <Header as="h4">Description:</Header>
              {podcastInfo && podcastInfo.find(x => {return x.name === "description"}).value}
            </Card.Content>
          </Card>
        )}
      </Grid.Column>
      <Grid.Column width={11}>
        <Label className={styles.box} size='massive'>Episodes: {trackCount}</Label>
        {!podcastInfo ? (
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
              {albums?.map(album => {
                const date = album.children.find(x => {return x.name === "pubDate"})?.value
                return (
                  <Table.Body key={date}>
                    <Table.Row>
                      <Table.Cell width={10}>{album.children.find(x => {return x.name === "title"})?.value}</Table.Cell>
                      <Table.Cell width={3}>{date}</Table.Cell>
                      <Table.Cell width={3}>{parseFloat(album.children.find(x => {return x.name === "itunes:duration"})?.value)}</Table.Cell>
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
