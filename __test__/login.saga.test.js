import { call, put } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import axios from 'axios'
import { authSaga, captchaSaga, auth, refresh } from '../login.saga.js'

import reducer, {actions, constants} from '../login'
import {credenciales, usuario, initialState, authState, captcha_base} from '../__mock__/login.mock.js'

describe('auth test', () => {
  const generator = auth(actions.login(credenciales))

  it('should call login endpoint', () => {
    expect(
      generator.next().value,
    ).toEqual(call(axios.post, '/login', credenciales))
  })

  it('should dispatch login success', () => {
    expect(
      generator.next(usuario).value,
    ).toEqual(put(actions.login_success(usuario)))
  })

  it('should dispatch route change', () => {
    expect(
      generator.next().value,
    ).toEqual(put(push('/')))
  })

  it('should dispatch captcha refresh', () => {
    expect(
      generator.next().value,
    ).toEqual(put(actions.refresh_captcha()))
  })

  it('should be done', () => {
    expect(
      generator.next(),
    ).toEqual({ done: true, value: undefined })
  })
});

describe('auth test', () => {
  const generator = auth(actions.login(credenciales))

  it('should call login endpoint', () => {
    expect(
      generator.next().value,
    ).toEqual(call(axios.post, '/login', credenciales))
  })

  it('should dispatch login failure', () => {
    expect(
      generator.throw('error').value
    ).toEqual(put(actions.login_failure()))
  })

  it('should dispatch captcha refresh', () => {
    expect(
      generator.next().value
    ).toEqual(put(actions.refresh_captcha()))
  })

  it('should be done', () => {
    expect(
      generator.next(),
    ).toEqual({ done: true, value: undefined })
  })

});

describe('captcha test', () => {
  const generator = refresh(actions.refresh_captcha())

  it('should dispatch server refresh captcha', () => {
    expect(
      generator.next().value
    ).toEqual(call(axios.get, '/public/refresh_captcha'))
  })

  it('should dispatch load captcha', () => {
    generator.next()
    expect(
      generator.next(123).value
    ).toEqual(put(actions.load_captcha(123)))
  })

  it('should be done', () => {
    expect(
      generator.next()
    ).toEqual({ done: true, value: undefined })
  })
});

describe('captcha test', () => {
  const generator = refresh(actions.refresh_captcha())

  it('should dispatch server refresh captcha', () => {
    expect(
      generator.next().value
    ).toEqual(call(axios.get, '/public/refresh_captcha'))
  })

  it('should call console with error', () => {
    expect(
      generator.throw('e').value
    ).toEqual(call(console.log, 'e'))
  })
});


describe('launch captcha saga', () => {

  it('should start login_success', () => {

    const iterator = captchaSaga();
    const expectedYield = call(takeEvery, "REFRESH_CAPTCHA", refresh);

    const actualYield = iterator.next().value;
    expect(actualYield).toEqual(expectedYield);
  })
});

describe('launch login saga', () => {

  it('should refresh captcha', () => {

    const iterator = authSaga();
    const expectedYield = call(takeEvery, "LOGIN_ATTEMPT", auth);

    const actualYield = iterator.next().value;
    expect(actualYield).toEqual(expectedYield);
  })
});

