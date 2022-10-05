import React from 'react';
import HeaderWrapped from '../HeaderWrapped';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { Switch, Route } from 'react-router-dom';
import { Pitches } from './Pitches/Pitches';

import { MiniDrawer } from './Drawer/MiniDrawer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'start',
    height: '100vh',
    marginLeft: '1rem',
  },
  main: {
    width: '100vw',
    paddingLeft: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    overflow: 'scroll',
    backgroundColor: '#E5E7ED',
  },
});

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <>
      <HeaderWrapped />
      <div style={{ display: 'flex', backgroundColor: '#e5e7ed' }}>
        <MiniDrawer />
        <main className={classes.main}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/manage/dashboard">
                <div> Management dashboard</div>
              </Route>
              <Route path="/manage/pitches">
                <Pitches />
              </Route>
              <Route path="/manage/contact">
                <div> Host contacts</div>
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
