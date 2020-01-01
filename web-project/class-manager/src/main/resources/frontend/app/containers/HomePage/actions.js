/*
 *
 * HomePage actions
 *
 */

import { SET_SEARCH_QUERY } from './constants';

export function setSearchQuery(data) {
  return {
    type: SET_SEARCH_QUERY,
    data,
  };
}
