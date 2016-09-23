// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'
export const LOAD_CAPTCHA = 'LOAD_CAPTCHA'
export const REFRESH_CAPTCHA = 'REFRESH_CAPTCHA'

export const constants = {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOAD_CAPTCHA,
  REFRESH_CAPTCHA
}

// ------------------------------------
// Actions
// ------------------------------------
export function refresh_captcha () {
  return {
    type: REFRESH_CAPTCHA
  }
}

export function load_captcha (seed) {
  return {
    type: LOAD_CAPTCHA,
    payload: seed
  }
}

export function login (credenciales) {
  return {
    type: LOGIN_ATTEMPT,
    payload: credenciales
  }
}

export function login_success (usuario) {
  return {
    type: LOGIN_SUCCESS,
    payload: usuario
  }
}

export function login_failure () {
  return {
    type: LOGIN_FAILED,
    payload: {}
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export const actions = {
  login,
  login_success,
  login_failure,
  logout,
  refresh_captcha,
  load_captcha
}

// ------------------------------------
// Reducers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_CAPTCHA]: (state, action) => Object.assign({}, state, {
                                          captcha_url: '/generate-captcha/gcb_captcha?random=' + action.payload
                                        }),
  [REFRESH_CAPTCHA]: (state, action) => state,
  [LOGIN_ATTEMPT]: (state, action) => state,
  [LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, {
                                        authenticated: true,
                                        usuario: action.payload,
                                        security_role: action.payload.username == 'admin' ? action.payload.username : 'encuestador'
                                      }),
  [LOGIN_FAILED]: (state, action) => Object.assign({}, state, {
                                        authenticated: false,
                                        usuario: undefined,
                                        security_role: 'none'
                                      }),
  [LOGOUT]: (state, action) => Object.assign({}, state, {
                                        authenticated: false,
                                        usuario: undefined,
                                        security_role: 'none'
                                      })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { authenticated : false, security_role: 'none'}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

