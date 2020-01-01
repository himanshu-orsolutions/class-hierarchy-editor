/**
 *
 * Asynchronously loads the component for HierarchyViewer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
