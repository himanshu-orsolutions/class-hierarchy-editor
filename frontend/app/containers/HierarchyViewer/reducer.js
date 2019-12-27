/*
 *
 * HierarchyViewer reducer
 *
 */
import produce from 'immer';
import { START_LOADER, STOP_LOADER, SET_TREE_DATA } from './constants';

export const initialState = {
  treeData: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const hierarchyViewerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_LOADER:
        draft.isLoading = true;
        break;
      case STOP_LOADER:
        draft.isLoading = false;
        break;
      case SET_TREE_DATA:
        draft.treeData = action.data;
        break;
    }
  });

export default hierarchyViewerReducer;
