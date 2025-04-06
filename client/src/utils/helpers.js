import sanitizeHtml from 'sanitize-html'

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.reload()
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