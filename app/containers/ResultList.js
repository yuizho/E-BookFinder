import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native'
import * as URI from '../lib/uri'
import ApiClient from '../lib/apiClient'

class ResultList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'E-Book検索結果',
  })

  constructor(props) {
    super(props)
    // TODO: ISBNをチェックする必要がある
    const code = props.navigation.state.params.code
    this.state = { searching: false, items: [] }
  }

  componentDidMount() {
    this.setState({searching: true})
    // TODO: 楽天Booksの検索結果はRelmに格納
    const params = {
      format: 'json',
      bookGenreId: '000',
      isbnjan: this.props.navigation.state.params.code,
      // temporary application id
      applicationId: '1065701398855394313'
    }
    const uri = ApiClient.createGetUri(URI.RAKUTEN_BOOKS_API, params)
    ApiClient.get(uri).then((resp) => {
      // TODO: 書籍名をもとにkoboAPIを叩いてkobo情報を取得する
      console.log(resp.Items)
      this.setState({searching: false, items: resp.Items})
    }).catch((ex) => {
      console.log(ex);
    })
  }
  
  render() {
    return (
      <View>
        {this.state.searching ? <Text>Searching...</Text>: null}
        // TODO: リストでコンポーネント化する
        <ScrollView>
          {!this.state.searching && this.state.items.map((item) => {
            // TODO: リストItemでコンポーネント化する
            return (
              <View key={`${item.isbn}-view`}>
                <Image
                   key={`${item.isbn}-image`}
                   style={{width: 50, height: 50}}
                   source={{uri: item.Item.smallImageUrl}}
                   />
                <Text key={`${item.isbn}-text`}>{item.Item.title}</Text>
              </View>

            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default ResultList
