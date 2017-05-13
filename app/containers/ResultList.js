import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'

class ResultList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.code}が読み込まれました`,
  })
  render() {
    return (
      <View>
        <Text>Hello, Navigation!</Text>
      </View>
    )
  }
}

export default ResultList
