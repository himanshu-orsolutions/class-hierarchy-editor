import { takeEvery, put } from 'redux-saga/effects';
import { errorToast } from 'utils/toast';
import axios from 'axios';
import { START_LOADING_TREE_DATA } from './constants';
import { setTreeData, startLoader, stopLoader } from './actions';

// Individual exports for testing
export default function* hierarchyViewerSaga() {
  yield takeEvery(START_LOADING_TREE_DATA, loadTreeData);
}

function* loadTreeData(action) {
  yield put(startLoader());

  try {
    const response = yield axios.get(`cheditor/api/subclasses/${action.data}`);
    yield put(setTreeData(response.data));
  } catch (error) {
    errorToast('Error occured while fecthing class hierarchy');
  }

  yield put(stopLoader());
}
