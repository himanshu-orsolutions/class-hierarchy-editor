/**
 *
 * CustomTreeItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fade, withStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import {
  Collapse,
  Typography,
  IconButton,
  Button,
  Modal,
  Grow,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClassForm from 'components/ClassForm';
import axios from 'axios';
import { successToast, errorToast } from 'utils/toast';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCustomTreeItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';
import { startLoadingTreeData } from '../actions';

export function CustomTreeItem(props) {
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useInjectReducer({ key: 'customTreeItem', reducer });
  useInjectSaga({ key: 'customTreeItem', saga });

  const deleteClass = () => {
    setIsDeleting(true);
    axios
      .get(`deleteclass/${props.nodeId}`)
      .then(() => {
        successToast('Class deleted successfully');
        setisDeleteDialogOpen(false);
        props.dispatch(startLoadingTreeData(0));
      })
      .catch(error => {
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast('Error occured while updating the class!!');
        }
        setIsDeleting(false);
      });
  };

  return (
    <>
      {/* Tree node */}
      <StyledTreeItem
        {...props}
        setisDeleteDialogOpen={setisDeleteDialogOpen}
        setIsFormOpen={setIsFormOpen}
      />

      {/* Edit form modal */}
      <Modal open={isFormOpen} className={styles.modal}>
        <Grow in={isFormOpen} timeout={500}>
          <div className={styles.content}>
            <ClassForm
              type="Edit"
              setIsFormOpen={setIsFormOpen}
              cid={props.nodeId}
              name={props.name}
              pid={props.pid}
              abstract={props.abstract}
              dispatch={props.dispatch}
            />
          </div>
        </Grow>
      </Modal>

      {/* Delete dialog */}
      <Dialog open={isDeleteDialogOpen}>
        <DialogTitle id="id-delete-dialog">
          Delete "{props.name}" class
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete {props.label} class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setisDeleteDialogOpen(false)}
            color="primary"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteClass}
            color="secondary"
            autoFocus
            disabled={isDeleting}
          >
            Delete !
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

CustomTreeItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customTreeItem: makeSelectCustomTreeItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CustomTreeItem);

// StyledTreeItem
const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => (
  <TreeItem
    {...props}
    nodeId={props.nodeId}
    TransitionComponent={TransitionComponent}
    label={
      <div className={styles.root}>
        <Typography variant="body2">{props.label}</Typography>
        <div>
          <IconButton
            aria-label="delete"
            onClick={e => {
              props.setisDeleteDialogOpen(true);
              e.stopPropagation();
            }}
          >
            <DeleteIcon
              color="inherit"
              fontSize="small"
              className={styles.deleteBtn}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            className={styles.editBtn}
            onClick={e => {
              props.setIsFormOpen(true);
              e.stopPropagation();
            }}
          >
            <EditIcon color="inherit" fontSize="small" />
          </IconButton>
        </div>
      </div>
    }
  />
));

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}
