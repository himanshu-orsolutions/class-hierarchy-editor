/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { START_SEARCH, RESET_SEARCH } from 'containers/SearchResult/constants';
import { SET_SEARCH_QUERY } from './constants';

export const initialState = {
  searchQuery: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_SEARCH:
        draft.searchQuery = action.data;
        break;
      case RESET_SEARCH:
        draft.searchQuery = '';
        break;
      case SET_SEARCH_QUERY:
        draft.searchQuery = action.data;
        break;
    }
  });

export default homePageReducer;
