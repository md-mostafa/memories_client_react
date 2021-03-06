import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery(); //where we will be getting our page info from
  const history = useHistory();
  const page =  query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);   // [europe, usa] -> 'europe,usa'



  const searchPost = () => {
    if(search.trim() || tags) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(',') })); // [europe, usa] -> 'europe,usa'
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }else {
      history.push('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) { //13 means enter key
      //search for posts
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));



  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
                name="search" 
                variant="outlined" 
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value= {search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput 
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label ="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
