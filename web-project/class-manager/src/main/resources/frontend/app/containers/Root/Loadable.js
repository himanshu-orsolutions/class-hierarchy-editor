/**
 *
 * Asynchronously loads the component for Root
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
