export default class ApiClient {
  static createGetUri(uri='', params={}) {
    if (!Object.values(params).length) {
      return uri
    }
    let query_args = []
    for (var [key, value] of Object.entries(params)){
      query_args.push(`${key}=${encodeURI(value)}`)
    }
    return `${uri}?` + query_args.join('&')
  }
  
  static get(uri) {
    return this.send(uri, null, 'GET')
  }
  
  static post(uri, params) {
    return this.send(uri, params, 'POST')
  }
  
  static send(uri, params, method) {
    const request = {}
    request.method = method
    request.body = params ? { body: JSON.stringfy(params) } : null
    request.headers = {
      'Content-Type': 'application/json',
    }
    return fetch(uri, request)
      .then((resp) => {
        if (resp.status !== 200 && resp.status !== 300) {
          // TODO: headerにRetry-Afterがある場合は再トライ
          let error = new Error(`http status ${resp.status} was returned.`)
          error.status = resp.status
          return Promise.reject(error)
        }
        return resp
      })
      .then((resp) => resp.json())
  }
}
