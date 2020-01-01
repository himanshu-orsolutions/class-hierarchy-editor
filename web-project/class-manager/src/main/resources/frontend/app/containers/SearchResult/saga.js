import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { errorToast } from 'utils/toast';
import { START_SEARCH } from './constants';
import { startLoader, setSearchData, stopLoader } from './actions';

// Individual exports for testing
export default function* searchResultSaga() {
  yield takeEvery(START_SEARCH, searchClasses);
}

function* searchClasses(action) {
  if (!action.data) return;

  yield put(startLoader());

  try {
    const response = yield axios.get(`searchclasses?tag=${action.data}`);
    yield put(setSearchData(response.data.classes));
  } catch (error) {
    errorToast('Error occured while fecthing class hierarchy');
  }

  yield put(stopLoader());
}
