export function resetNwlInputs(inputs) {
  inputs.conditions = null
  inputs.email = ''
}

export function resetNwlErrors(errors) {
  errors.conditions = ''
  errors.email = ''
}

export async function subForm(inputs, errors) {
  resetMsgErrors(errors)

  await axios({
    method: 'post',
    url: '/subscribe',
    withCredentials: true,
    data: inputs,
  })
    .then((res) => {
      if (typeof res.data === 'object') {
        console.log(res.data)
        alert('returned data is an object or an array')
      } else {
        alert(res.data)
      }

      resetNwlErrors(errors)
      resetNwlInputs(inputs)
    })
    .catch((err) => {
      const errorsList = err.response.data.errors

      errorsList.map((error) => {
        if (error.field === 'conditions') {
          inputs.conditions = null
          errors.conditions = error.message
        }

        if (error.field === 'email') {
          errors.email = error.message
        }

        if (error.field === 'send') {
          alert(error.message)
        }
      })
    })
}

export async function unsubForm(inputs, errors) {
  resetMsgErrors(errors)

  await axios({
    method: 'post',
    url: '/unsubscribe',
    withCredentials: true,
    data: inputs,
  })
    .then((res) => {
      alert(res.data)

      resetNwlErrors(errors)
      resetNwlInputs(inputs)
    })
    .catch((err) => {
      const errorsList = err.response.data.errors

      errorsList.map((error) => {
        if (error.field === 'conditions') {
          inputs.conditions = null
          errors.conditions = error.message
        }

        if (error.field === 'email') {
          errors.email = error.message
        }

        if (error.field === 'send') {
          alert(error.message)
        }
      })
    })
}

export async function resubForm(inputs, errors) {
  resetMsgErrors(errors)

  await axios({
    method: 'post',
    url: '/resubscribe',
    withCredentials: true,
    data: inputs,
  })
    .then((res) => {
      alert(res.data)

      resetNwlErrors(errors)
      resetNwlInputs(inputs)
    })
    .catch((err) => {
      const errorsList = err.response.data.errors

      errorsList.map((error) => {
        if (error.field === 'conditions') {
          inputs.conditions = null
          errors.conditions = error.message
        }

        if (error.field === 'email') {
          errors.email = error.message
        }

        if (error.field === 'send') {
          alert(error.message)
        }
      })
    })
}
