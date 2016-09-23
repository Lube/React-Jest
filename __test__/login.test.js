import reducer, {actions, constants} from '../login'
import {credenciales, usuario, initialState, authState, captcha_base, seed} from '../__mock__/login.mock.js'

test('login action should return a LOGIN_ATTEMPT action with credentials', () => {
  expect(actions.login(credenciales)).toEqual({type: constants.LOGIN_ATTEMPT, payload: credenciales});
});

test('login action should return with credentials with username and password', () => {
  let accion = actions.login(credenciales);

  ['payload', 'type'].map((propiedad) => expect(accion[propiedad]).toBeDefined())
});


describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle REFRESH_CAPTCHA', () => {
    expect(
      reducer(initialState, actions.refresh_captcha())
    ).toEqual(initialState)
  })

  it('should handle LOAD_CAPTCHA', () => {
  	const state = reducer(initialState, actions.load_captcha(123465))
    expect(state.captcha_url).toEqual(captcha_base+123465)
  })

  it('should handle LOGIN_ATTEMPT', () => {
    expect(
      reducer(initialState, actions.login(credenciales))
    ).toEqual(initialState)
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(initialState, actions.login_success(usuario))
    ).toEqual(authState)
  })

  it('should handle LOGIN_FAILED', () => {
    expect(
      reducer(authState, actions.login_failure())
    ).toEqual(initialState)
  })

  it('should handle LOGOUT', () => {
    expect(
      reducer(authState, actions.logout())
    ).toEqual(initialState)
  })
})
