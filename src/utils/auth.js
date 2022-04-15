// Register user and return email and owner ID
const baseUrl= 'https://around.nomoreparties.co' 
const groupID= 'group-11'

function checkServerCode(res) {
  if (res.ok) {
    console.log(res)
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkServerCode(res))
}

// Log in with email password, return auth token
export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkServerCode(res))
}

export const checkToken = (token) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => checkServerCode(res))
}