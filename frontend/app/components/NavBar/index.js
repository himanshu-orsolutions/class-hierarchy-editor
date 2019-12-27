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

import styles from './styles.scss';

function NavBar({ dispatch }) {
  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const onSearchTextChange = e => {
    console.log(e.target.value);
  };

  return (
    <>
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
