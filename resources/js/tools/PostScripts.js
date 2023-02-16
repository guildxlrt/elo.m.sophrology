export async function deletePost(id) {
  const delMsg = `
        Attention, la suppression d'un article est definitive.
        \n
        Vous pouvez mettre en prive un article sans pour autant le supprimer.
        \n
        Etes-vous certains de vouloir le supprimer ?
    `
  if (confirm(delMsg) === true) {
    await axios({
      method: 'delete',
      url: `/blog/${id}/delete`,
      withCredentials: true,
    })
      .then((res) => {
        alert(res.data)
        setTimeout(function () {
          window.location.href = '/blog'
        }, 1500)
      })
      .catch((err) => console.error(err))
  } else {
    alert("L'article ne sera pas supprime")
  }
}

export async function newStatus(id) {
  await axios({
    method: 'patch',
    url: `/blog/${id}/status`,
    withCredentials: true,
  }).catch((err) => console.error(err))
}
