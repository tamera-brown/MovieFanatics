import React,{ useState, useEffect }from 'react'
import Form from './components/Form/form.js'
import Movies from './components/Movies/movies.js'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import {getMovies} from './actions/movies'
import {Container, AppBar, Typography, Grow, Grid,Toolbar,Button,IconButton} from '@material-ui/core'


const App=()=>{
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes=useStyles();

    useEffect(() => {
        dispatch(getMovies());
      }, [currentId, dispatch]);
    
return(
   
    <div className={classes.root} maxWidth="lg">
        <AppBar position="static">
            <Toolbar>
            <Typography className={classes.heading} variant="h2" align="center">MovieFanatics</Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
           
            {/* <img src={movies} alt="movies" height="60"/> */}
        </AppBar>
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                    <Movies setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </div>
);
}
export default App;