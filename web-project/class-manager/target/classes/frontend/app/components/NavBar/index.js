/**
 *
 * NavBar
 *
 */

import React, { memo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Modal,
  Grow,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClassForm from 'components/ClassForm';
import { startSearch } from 'containers/SearchResult/actions';
import { setSearchQuery } from 'containers/HomePage/actions';

import styles from './styles.scss';

function NavBar({ dispatch, searchQuery }) {
  const handleSearch = e => {
    e.preventDefault();
    dispatch(startSearch(searchQuery));
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const onSearchTextChange = e => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <>
      <AppBar position="static" className={styles.root}>
        <Toolbar>
          <Typography className={styles.title} variant="h6" noWrap>
            Class hierarchy editor
          </Typography>
          <form onSubmit={handleSearch} noValidate>
            <div className={styles.search}>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: styles.inputRoot,
                  input: styles.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onSearchTextChange}
                value={searchQuery}
              />
            </div>
            <Button size="small" type="submit" className={styles.searchBtn}>
              Search
            </Button>
          </form>
          <Button size="small" onClick={() => setIsAddFormOpen(true)}>
            Add class
          </Button>
        </Toolbar>
      </AppBar>
      <Modal open={isAddFormOpen} className={styles.modal}>
        <Grow in={isAddFormOpen} timeout={500}>
          <div className={styles.content}>
            <ClassForm
              type="Add"
              setIsFormOpen={setIsAddFormOpen}
              dispatch={dispatch}
            />
          </div>
        </Grow>
      </Modal>
    </>
  );
}

NavBar.propTypes = {};

export default memo(NavBar);
