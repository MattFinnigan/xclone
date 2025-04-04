export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.reload()
}