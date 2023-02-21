export async function logout() {
  const logoutMsg = `Voulez allez etre deconnecte ?`
  if (confirm(logoutMsg) === true) {
    await axios({
      method: 'delete',
      url: `/logout`,
    })
      .then((res) => {
        setTimeout(function () {
          window.location.href = '/'
        }, 1500)
      })
      .catch((err) => console.error(err))
  } else {
    alert('La deconnexion a echouee')
  }
}
