const delMsg = `
  Attention, la suppression d'un article est definitive.
  \n
  Vous pouvez mettre en prive un article sans pour autant le supprimer.
  \n
  Etes-vous certains de vouloir le supprimer ?
`

export async function deletePost(id) {
  await axios({
    method: 'delete',
    url: `/blog/${id}/before-delete`,
    withCredentials: true,
  })
    .then(async () => {
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
        alert('La publication ne sera pas supprime')
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Cette publication n'est pas le votre")
    })
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

export async function submitPostForm(event, id, content_type, errors) {
  resetPostErrors(errors)

  const formData = new FormData(event.target)
  let data = null

  if (content_type === 'ARTICLE') {
    const title = formData.get('title')
    const content = formData.get('content')

    const checkbox = formData.get('covercheck')
    const cover = formData.get('cover')
    let covercheck = false

    if (checkbox && checkbox === 'on') {
      covercheck = true
    }

    data = {
      content_type: content_type,
      title: title,
      content: content,
      covercheck: covercheck,
      cover: cover,
    }
  } else if (content_type === 'VIDEO') {
    const title = formData.get('title')
    const video = formData.get('video')

    data = {
      content_type: content_type,
      title: title,
      video: video,
    }
  }

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
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      const { msg, url_path, created } = res.data

      alert(msg)

      if (created === true) {
        setTimeout(function () {
          window.location.href = `/blog/${url_path}`
        }, 1500)
      } else {
        window.location.href = `/blog/${url_path}`
      }
    })
    .catch((err) => {
      const errList = err.response.data.errors

      errList.map((error) => {
        if (error.field === 'title') {
          errors.title = error.message
        }
        if (error.field === 'content') {
          errors.content = error.message
        }
        if (error.field === 'video') {
          errors.content = error.message
        }
        if (error.field === 'cover') {
          errors.cover = error.message
        }
        if (!error.field) {
          errors.content = 'Acces non authorise...'
        }
      })
    })
}
