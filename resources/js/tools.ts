import axios from 'axios'

interface Inputs {
  surname: string
  name: string
  email: string
  message: string
  conditions: boolean | null
}

export default async (inputs: Inputs, showForm: boolean) => {
  if (inputs.conditions !== true) {
    console.error('Conditions must be accepted')
  }
  if (inputs.conditions === true) {
    await axios({
      method: 'post',
      url: `/message`,
      withCredentials: true,
      data: inputs,
    })
      .then(() => {
        // Resets contact form
        showForm = false
        inputs.conditions = null
        inputs.surname = ''
        inputs.name = ''
        inputs.email = ''
        inputs.message = ''
      })
      .catch((err) => console.error(err))
  }
}
