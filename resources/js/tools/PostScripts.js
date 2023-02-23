const delMsg = `
  Attention, la suppression d'un article est definitive.
  \n
  Vous pouvez mettre en prive un article sans pour autant le supprimer.
  \n
  Etes-vous certains de vouloir le supprimer ?
`

export async function deletePost(id) {
  let delAuth = null

  await axios({
    method: 'get',
    url: `/blog/${id}/before-delete`,
    withCredentials: true,
  })
    .then((res) => (delAuth = res.data.authorized))
    .catch((err) => console.error(err))

  if (delAuth === true) {
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
  } else alert("Cet article n'est pas le votre")
}

export async function newStatus(id) {
  let response = {}

  await axios({
    method: 'patch',
    url: `/blog/${id}/status`,
    withCredentials: true,
  })
    .then(() => {
      response = {
        success: true,
        msg: `L'etat a ete change`,
      }
    })
    .catch((err) => {
      console.error(err)
      alert(err.response.data)

      response = {
        success: false,
        msg: `Acces non authorise`,
      }
    })

  return response
}

export function resetPostErrors(errors) {
  errors.title = ''
  errors.content = ''
}

export async function submitPostForm(event, id, errors) {
  resetPostErrors(errors)

  const formData = new FormData(event.target)

  const title = formData.get('title')
  const content = formData.get('content')

  let url = null
  if (id === 'new') {
    url = '/blog/new'
  } else {
    url = `/blog/${id}/update`
  }

  await axios({
    method: 'post',
    url: url,
    withCredentials: true,
    data: {
      title: title,
      content: content,
    },
  })
    .then((res) => {
      const { msg, id, created } = res.data

      alert(msg)

      if (created === true) {
        setTimeout(function () {
          window.location.href = `/blog/${id}`
        }, 1500)
      } else {
        window.location.reload()
      }
    })
    .catch((err) => {
      const errorsList = err.response.data.errors

      console.log(errorsList)

      errorsList.map((error) => {
        if (error.field === 'title') {
          errors.title = error.message
        }
        if (error.field === 'content') {
          errors.content = error.message
        }
        if (!error.field) {
          errors.content = 'Acces non authorise...'
        }
      })
    })
}
