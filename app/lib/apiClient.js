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
    return this.request(uri, null, 'GET')
  }
  
  static post(uri, params) {
    return this.request(uri, params, 'POST')
  }
  
  static request(uri, params, method) {
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
    })
  }
}
