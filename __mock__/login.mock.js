export const credenciales = { username: 'Lube', password: '12345678', captcha: 'Yfgh2' }

export const initialState = { authenticated : false, security_role: 'none' }

export const authState = { authenticated : true, 
						   usuario: { username: 'admin' }, 
						   security_role: 'admin' }

export const usuario = { username: 'admin' }

export const captcha_base = '/generate-captcha/gcb_captcha?random='