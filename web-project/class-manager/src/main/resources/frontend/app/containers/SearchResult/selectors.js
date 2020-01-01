import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchResult state domain
 */

const selectSearchResultDomain = state => state.searchResult || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResult
 */

const makeSelectSearchResult = () =>
  createSelector(
    selectSearchResultDomain,
    substate => substate,
  );

export default makeSelectSearchResult;
export { selectSearchResultDomain };
