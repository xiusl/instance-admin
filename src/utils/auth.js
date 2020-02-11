import Cookies from 'js-cookie'

const TokenKey = 'SL-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: 7})
}

export function rmToken() {
  return Cookies.remove(TokenKey)
}

export function setName(name) {
  return localStorage.setItem("name", name)
}

export function getName() {
  return localStorage.getItem("name")
}

export function rmName() {
  return localStorage.removeItem("name")
}
