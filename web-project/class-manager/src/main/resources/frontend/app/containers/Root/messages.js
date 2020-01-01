/*
 * Root Messages
 *
 * This contains all the text for the Root container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Root';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Root container!',
  },
});
