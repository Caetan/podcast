import React from 'react';
import {Container, Divider, Header} from 'semantic-ui-react';


const HeaderComponent = () => {
  return (
    <Container style={{paddingTop: "1rem"}}>
      <Header as="h2" color="blue" textAlign='left'>Podcaster</Header>
      <Divider />
    </Container>
  );
};

export default HeaderComponent;
