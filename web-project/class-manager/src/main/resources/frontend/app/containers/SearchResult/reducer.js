/*
 *
 * SearchResult reducer
 *
 */
import produce from 'immer';
import {
  SET_SEARCH_DATA,
  STOP_LOADER,
  START_LOADER,
  RESET_SEARCH,
} from './constants';

export const initialState = {
  data: [],
  isLoading: false,
  isShowSearchResult: false,
};

/* eslint-disable default-case, no-param-reassign */
const searchResultReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEARCH_DATA:
        draft.data = action.data;
        break;
      case START_LOADER:
        draft.isLoading = true;
        draft.isShowSearchResult = true;
        break;
      case STOP_LOADER:
        draft.isLoading = false;
        break;
      case RESET_SEARCH:
        draft.data = [];
        draft.isShowSearchResult = false;
        break;
    }
  });

export default searchResultReducer;
