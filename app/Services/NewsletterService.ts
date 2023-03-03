import mailchimp from '@mailchimp/mailchimp_marketing'

const mailchimpCfg = {
  apiKey: '9e84a1d11befe45a70838017f45e47ca-us13',
  server: 'us13',
  list_id: '9c37c81054',
}

export class NewsletterService {
  async all(params: Record<string, any>) {
    let promise: any = 'service_error'

    mailchimp.setConfig({
      apiKey: mailchimpCfg.apiKey,
      server: mailchimpCfg.server,
    })

    try {
      await mailchimp.lists
        .getListMembersInfo(mailchimpCfg.list_id)
        .then((res: any) => {
          if (res.members) {
            const membersList = res.members
            const objToArr = Object.values(membersList)
            promise = objToArr
          } else {
            promise = res
          }
        })
        .catch((error: any) => {
          const status = error.status
          const { detail } = JSON.parse(error.response.text)
          promise = `mailchimp service error ${status} : ${detail}`
        })

      return promise
    } catch (error) {
      return promise
    }
  }

  async ping(params: Record<string, any>) {
    let promise: any = 'service_error'

    mailchimp.setConfig({
      apiKey: mailchimpCfg.apiKey,
      server: mailchimpCfg.server,
    })

    try {
      await mailchimp.ping
        .get()
        .then((res: any) => {
          if (res.health_status) {
            promise = res.health_status
          } else {
            promise = res
          }
        })
        .catch((error: any) => {
          const status = error.status
          const { detail } = JSON.parse(error.response.text)
          promise = `mailchimp service error ${status} : ${detail}`
        })

      return promise
    } catch (error) {
      return promise
    }
  }

  async add(params: Record<string, any>) {
    let promise: any = 'service_error'

    mailchimp.setConfig({
      apiKey: mailchimpCfg.apiKey,
      server: mailchimpCfg.server,
    })

    try {
      await mailchimp.lists
        .addListMember(mailchimpCfg.list_id, {
          email_address: params.email,
          status: 'subscribed',
        })
        .then((res: any) => {
          const { status, email_address } = res

          promise = `${email_address} : ${status}`
        })
        .catch((error: any) => {
          const status = error.status
          const { detail } = JSON.parse(error.response.text)
          promise = `mailchimp service error ${status} : ${detail}`
        })

      return promise
    } catch (error) {
      return promise
    }
  }

  async unsub(params: Record<string, any>) {
    let promise: any = 'service_error'

    mailchimp.setConfig({
      apiKey: mailchimpCfg.apiKey,
      server: mailchimpCfg.server,
    })

    try {
      await mailchimp.lists
        .updateListMember(mailchimpCfg.list_id, params.email, {
          status: 'unsubscribed',
        })
        .then((res: any) => {
          const { status, email_address } = res

          promise = `${email_address} : ${status}`
        })
        .catch((error: any) => {
          const status = error.status
          const { detail } = JSON.parse(error.response.text)
          promise = `mailchimp service error ${status} : ${detail}`
        })

      return promise
    } catch (error) {
      return promise
    }
  }

  async resub(params: Record<string, any>) {
    let promise: any = 'service_error'

    mailchimp.setConfig({
      apiKey: mailchimpCfg.apiKey,
      server: mailchimpCfg.server,
    })

    try {
      await mailchimp.lists
        .updateListMember(mailchimpCfg.list_id, params.email, {
          status: 'subscribed',
        })
        .then((res: any) => {
          const { status, email_address } = res

          promise = `${email_address} : ${status}`
        })
        .catch((error: any) => {
          const status = error.status
          const { detail } = JSON.parse(error.response.text)
          promise = `mailchimp service error ${status} : ${detail}`
        })

      return promise
    } catch (error) {
      return promise
    }
  }
}
