/**
 *
 * NavBar
 *
 */

import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles.scss';

function NavBar() {
  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
  };

  const onSearchTextChange = e => {
    console.log(e.target.value);
  };

  return (
    <AppBar position="static" className={styles.root}>
      <Toolbar>
        <Typography className={styles.title} variant="h6" noWrap>
          Class hierarchy editor
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
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
            />
          </div>
        </form>
        <Button size="small">Add class</Button>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {};

export default memo(NavBar);
