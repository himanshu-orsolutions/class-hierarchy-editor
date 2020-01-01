import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the root state domain
 */

const selectRootDomain = state => state.root || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Root
 */

const makeSelectRoot = () =>
  createSelector(
    selectRootDomain,
    substate => substate,
  );

export default makeSelectRoot;
export { selectRootDomain };
