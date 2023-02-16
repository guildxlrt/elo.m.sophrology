export async function resetMsgInputs(inputs) {
  inputs.conditions = null
  inputs.surname = ''
  inputs.name = ''
  inputs.email = ''
  inputs.content = ''
}

export function resetMsgErrors(errors) {
  errors.conditions = ''
  errors.surname = ''
  errors.name = ''
  errors.email = ''
  errors.content = ''
}

export async function submitMsgForm(inputs, errors) {
  resetMsgErrors(errors)

  if (inputs.conditions !== true) {
    inputs.conditions = null
    errors.conditions = 'Les conditions doivent etre acceptees'
  } else {
    await axios({
      method: 'post',
      url: `/message`,
      withCredentials: true,
      data: inputs,
    })
      .then((res) => {
        alert(res.data)
        setTimeout(function () {
          window.location.reload()
        }, 1500)
      })
      .catch((err) => {
        const errorsList = err.response.data.errors

        errorsList.map((error) => {
          if (error.field === 'conditions') {
            inputs.conditions = null
            errors.conditions = error.message
          }
          if (error.field === 'surname') {
            errors.surname = error.message
          }
          if (error.field === 'name') {
            errors.name = error.message
          }
          if (error.field === 'email') {
            errors.email = error.message
          }
          if (error.field === 'content') {
            errors.content = error.message
          }
        })
      })
  }
}
