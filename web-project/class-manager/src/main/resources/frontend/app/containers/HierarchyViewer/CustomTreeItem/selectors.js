import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customTreeItem state domain
 */

const selectCustomTreeItemDomain = state =>
  state.customTreeItem || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomTreeItem
 */

const makeSelectCustomTreeItem = () =>
  createSelector(
    selectCustomTreeItemDomain,
    substate => substate,
  );

export default makeSelectCustomTreeItem;
export { selectCustomTreeItemDomain };
