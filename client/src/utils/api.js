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
          window.location.reload('/')
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
      resolve(null)
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
      localStorage.setItem('userId', response.user.id)
      api.defaults.headers['Authorization'] = response.token
      resolve(response.user)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const register = (name, email, password) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/auth/register', { name, email, password }).then((response) => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      api.defaults.headers['Authorization'] = response.token
      resolve(response.user)
    }).catch((error) => {
      reject(error)
    })
  })
}

// posts
export const createPost = (data) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/posts', data).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const fetchPost = (id) => {
  return new Promise((resolve, reject) => {
    apiGet('/api/posts/' + id).then((response) => {
      console.log('fetchPost', response)
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    apiGet('/api/posts').then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    api.delete('/api/posts/' + id).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// comments
export const createComment = (data) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/comments', data).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    api.delete('/api/comments/' + id).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// repost
export const createRepost = (data) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/posts/repost', data).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}


// like
export const toggleLike = (postId) => {
  return new Promise((resolve, reject) => {
    apiPost('/api/posts/' + postId + '/like').then((response) => {
      console.log('toggleLike', response)
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// fetch user profile
export const fetchUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    apiGet('/api/users/profile/' + userId).then((response) => {
      console.log('fetchUserProfile', response)
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}