import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hierarchyViewer state domain
 */

const selectHierarchyViewerDomain = state =>
  state.hierarchyViewer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HierarchyViewer
 */

const makeSelectHierarchyViewer = () =>
  createSelector(
    selectHierarchyViewerDomain,
    substate => substate,
  );

export default makeSelectHierarchyViewer;
export { selectHierarchyViewerDomain };
