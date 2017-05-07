import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'

class ResultList extends Component {
  static navigationOptions = {
    title: '検索結果',
  }
  render() {
    return (
      <View>
        <Text>Hello, Navigation!</Text>
      </View>
    )
  }
}

export default ResultList
