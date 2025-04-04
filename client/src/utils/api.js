import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : ''
  }
})

const handleError = (error) => {
  return new Promise((resolve, reject) => {
    if (error.response) {
      if (error.response.status === 401) {
        // token expired
        renewToken().then(() => {
          resolve()
        }).catch(() => {
          // logout
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          api.defaults.headers['Authorization'] = ''
          window.location.href = '/'
        })
      } else {
        return reject(error)
      }
    } else {
      return reject(error)
    }
  })
}

const apiGet = (url) => {
  return new Promise((resolve, reject) => {
    api.get(url).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      handleError(error).then(() => {
        api.get(url).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          return reject(error)
        })
      }).catch((error) => {
        return reject(error)
      })
    })
  })
}

const apiPost = (url, data) => {
  return new Promise((resolve, reject) => {
    api.post(url, data).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      handleError(error).then(() => {
        api.post(url, data).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          return reject(error)
        })
      }).catch((error) => {
        return reject(error)
      })
    })
  })
}
// auth

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    if (!localStorage.getItem('userId')) {
      return reject()
    }
    apiGet('/api/auth/check/' + localStorage.getItem('userId')).then((response) => {
      resolve(response.user)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const renewToken = () => {
  return new Promise((resolve, reject) => {
    apiGet('/api/auth/renew/' + localStorage.getItem('userId')).then((response) => {
      localStorage.setItem('token', response.token)
      api.defaults.headers['Authorization'] = response.token
      resolve()
    })
  })
}

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/auth/login', { email, password }).then((response) => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      api.defaults.headers['Authorization'] = response.token
      resolve(response.user)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    apiGet('/api/users/list').then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

