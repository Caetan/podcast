import React from 'react';
import {Grid, Label, Table, Loader, Dimmer} from 'semantic-ui-react';

import styles from './PodcastComponent.module.css';


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

const PodcastComponent = ({podcastDetails, episodes}) => {

  return (
      <Grid.Column width={11}>
        <Label className={styles.box} size='massive'>Episodes: {podcastDetails?.trackCount}</Label>
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
                      <Table.Cell width={10} href={`/podcast/${episode.collectionId}/episode/${episode.trackId}`} onClick={() => localStorage.setItem('episode', JSON.stringify(episode))}>{title}</Table.Cell>
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
  );
};

export default PodcastComponent;
