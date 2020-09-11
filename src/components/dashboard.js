import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, Paper } from '@material-ui/core';
import anotherStore from '../store/anotherStore'

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
    const [analyticsState, setAnalyticsState] = useState(anotherStore.initialState);

    useEffect(() => {
      const sub = anotherStore.subscribe(setAnalyticsState);
      anotherStore.init();
      anotherStore.setTemperature.subscribe({
          next(x) {
              setAnalyticsState(x)
          },
      })
      return () => sub.unsubscribe();
    },[]);

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
            <span className={classes.text}>{analyticsState.temperature}</span>
          </Paper>
        </Grid>
        <Grid key='pressure' item xs>
          <Paper className={classes.paper}>
           <b>Air Pressure</b>
            <span className={classes.text}>{analyticsState.airPressure}</span>
          </Paper>
        </Grid>
        <Grid key='humidity' item xs>
          <Paper className={classes.paper}>
           <b>Humidity</b>
            <span className={classes.text}>{analyticsState.humidity}</span>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default Dashboard;
