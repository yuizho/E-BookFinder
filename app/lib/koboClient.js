import * as URI from './uri'
import ApiClient from './apiClient'

export default class KoboClient {
  static retrieveKoboInfo(isbn='') {
    return this.fetchRakutenBooks(isbn)
      .then((resp) => {
        // TODO: titileの( とかをspace変換したほうがいいか？？
        return this.fetchKobo(resp.Items[0].Item.title, resp.Items[0].Item.author)
      })
      .then((resp) => {
        const items = []
        resp.Items.map((item) => {
          items.push({
            title: item.Item.title,
            image: item.Item.smallImageUrl,
            price: item.Item.itemPrice,
            url: item.Item.itemUrl,
            key: item.Item.itemNumber,
            type: 'kobo',
          })
        })
        return items
      })
      .catch((ex) => {console.error(ex)})
  }

  static fetchRakutenBooks(isbn='') {
    const params = {
      format: 'json',
      bookGenreId: '000',
      isbnjan: isbn,
      // temporary application id
      applicationId: '1065701398855394313'
    }
    const uri = ApiClient.createGetUri(URI.RAKUTEN_BOOKS_API, params)
    return ApiClient.get(uri)
  }

  static fetchKobo(keyword='', author='') {
    const params = {
      format: 'json',
      keyword: keyword,
      author: author,
      // temporary application id
      applicationId: '1065701398855394313'
    }
    const uri = ApiClient.createGetUri(URI.RAKUTEN_KOBO_API, params)
    return ApiClient.get(uri)
  }
}
