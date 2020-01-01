/*
 *
 * HierarchyViewer actions
 *
 */

import {
  START_LOADING_TREE_DATA,
  START_LOADER,
  STOP_LOADER,
  SET_TREE_DATA,
} from './constants';

export function startLoadingTreeData(data) {
  return {
    type: START_LOADING_TREE_DATA,
    data,
  };
}

export function setTreeData(data) {
  return {
    type: SET_TREE_DATA,
    data,
  };
}

export function startLoader() {
  return {
    type: START_LOADER,
  };
}

export function stopLoader() {
  return {
    type: STOP_LOADER,
  };
}
