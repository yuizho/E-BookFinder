export default class ApiClient {
  static get(uri) {
    return this.request(uri, null, 'GET')
  }
  
  static post(uri, params) {
    return this.request(uri, params, 'POST')
  }
  
  static send(uri, params, method) {
    const request = {}
    request.method = method
    request.body = params ? { body: JSON.stringfy(params) } : null
    request.headers = {
      'Content-Type': 'application/json',
    }
    return fetch(uri, request).then(resp => {
      let json = resp.json()
      if (resp.ok) {
        return json
      }
      return json.then(e => {throw e})
    }).then(json => json.results)
  }
}
