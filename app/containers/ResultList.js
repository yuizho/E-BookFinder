import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native'
import KoboClient from '../lib/koboClient'

class ResultList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'E-Book検索結果',
  })

  constructor(props) {
    super(props)
    // TODO: ISBNかどうかをチェックする必要がある
    const code = props.navigation.state.params.code
    this.state = { searching: false, items: [], errMsg: '' }
  }

  componentDidMount() {
    this.setState({searching: true})
    // fetch e-book data form API.
    Promise.all([KoboClient.retrieveKoboInfo(this.props.navigation.state.params.code)])
      .then((items) => {
        this.setState({searching: false, items: items[0]})
      })
      .catch((ex) => {
        console.error(ex)
      })
  }
  
  render() {
    return (
      <View>
        {this.state.searching ? <Text>Searching...</Text>: null}
        <ScrollView>
          {!this.state.searching && this.state.items.map((item) => {
            // TODO: リストItemでコンポーネント化する
            return (
              <View key={`${item.key}-view`}>
                <Image
                   key={`${item.key}-image`}
                   style={{width: 50, height: 50}}
                   source={{uri: item.image}}
                   />
                <Text key={`${item.key}-title`}>{item.title}</Text>
              </View>

            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default ResultList
