import sanitizeHtml from 'sanitize-html'

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.reload('/')
  window.location.href = '/'
}

export const sanitize = (dirty) => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  })
}

export const formatDate = (dateTime, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  const date = new Date(dateTime)
  return date.toLocaleDateString('en-GB', options)
}

export const formatTime = (dateTime, options = { hour: '2-digit', minute: '2-digit' }) => {
  const date = new Date(dateTime)
  return date.toLocaleTimeString('en-GB', options)
}