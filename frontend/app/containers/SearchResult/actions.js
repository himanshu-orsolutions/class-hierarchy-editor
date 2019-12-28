/*
 *
 * SearchResult actions
 *
 */

import {
  START_SEARCH,
  SET_SEARCH_DATA,
  START_LOADER,
  STOP_LOADER,
  RESET_SEARCH,
} from './constants';

export function startSearch(data) {
  return {
    type: START_SEARCH,
    data,
  };
}

export function setSearchData(data) {
  return {
    type: SET_SEARCH_DATA,
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

export function resetSearch() {
  return {
    type: RESET_SEARCH,
  };
}
