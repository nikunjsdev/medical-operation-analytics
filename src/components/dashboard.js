import React, { useState, useLayoutEffect, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, Paper } from '@material-ui/core';
import analyticsStore from '../store/index.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 340,
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#f5f5f5'
  },
  text: {
    marginLeft: 10,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [analyticsState, setAnalyticsState] = useState(analyticsStore.initialState);

  useLayoutEffect(() => {
    const sub = analyticsStore.subscribe(setAnalyticsState);
    analyticsStore.init();
    return () => sub.unsubscribe();
  },[]);

  useEffect(() => {
    const range = Math.random() * (2000 - 100) + 100;
    const interval = setInterval(()=>{
      analyticsStore.getData();
    }, range)
    return () => clearInterval(interval);
  },[])

  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Medical Operation Analytics
          </Typography> 
        </Toolbar>
      </AppBar>
      
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid key='temperature' item xs>
          <Paper className={classes.paper}>
           <b>Temperature</b>
            <span className={classes.text}>{analyticsState.data.temperature}</span>
          </Paper>
        </Grid>
        <Grid key='pressure' item xs>
          <Paper className={classes.paper}>
           <b>Air Pressure</b>
            <span className={classes.text}>{analyticsState.data.airPressure}</span>
          </Paper>
        </Grid>
        <Grid key='humidity' item xs>
          <Paper className={classes.paper}>
           <b>Humidity</b>
            <span className={classes.text}>{analyticsState.data.humidity}</span>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default Dashboard;
