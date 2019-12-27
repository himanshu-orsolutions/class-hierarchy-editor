/*
 *
 * HierarchyViewer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  treeData: {
    cid: 0,
    name: 'Root',
    superclassOf: [
      {
        cid: 1,
        name: 'Vehicle',
        superclassOf: [
          {
            cid: 2,
            name: 'Car',
          },
          {
            cid: 3,
            name: 'Plane',
          },
          {
            cid: 4,
            name: 'Watercraft',
            superclassOf: [
              {
                cid: 5,
                name: 'Ship',
              },
              {
                cid: 6,
                name: 'Boat',
                superclassOf: [
                  {
                    cid: 7,
                    name: 'Powerboat',
                  },
                  {
                    cid: 8,
                    name: 'Rowingboat',
                    superclassOf: [
                      {
                        cid: 9,
                        name: 'Gondola',
                      },
                    ],
                  },
                ],
              },
              {
                cid: 10,
                name: 'SailingVessel',
              },
            ],
          },
          {
            cid: 223,
            name: 'C',
          },
        ],
      },
      {
        cid: 12,
        name: 'Vehicle2',
      },
      {
        cid: 13,
        name: 'Vehicle3',
      },
    ],
  },
};

/* eslint-disable default-case, no-param-reassign */
const hierarchyViewerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default hierarchyViewerReducer;
