import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { login_success, login_failure, captcha_ready, refresh_captcha, load_captcha } from './login'
import { push } from 'react-router-redux'

import axios from 'axios'

export function* auth(action) {
   try {
      const usuario = yield call(axios.post, '/login', action.payload);
      yield put(login_success(usuario));
      yield put(push('/'));
   } catch (e) {
      yield put(login_failure());
   } finally {
      yield put(refresh_captcha());
   }
}

export function* authSaga() {
  yield call(takeEvery, "LOGIN_ATTEMPT", auth);
}

export function* refresh(action) {
   try {
    yield call(axios.get, '/public/refresh_captcha');
    const seed = yield call(Math.random);
    yield put(load_captcha(seed));
   } catch (e) {
    yield call(console.log, e)
   }
}

export function* captchaSaga() {
  yield call(takeEvery, "REFRESH_CAPTCHA", refresh);
}


