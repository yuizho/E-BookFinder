import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
} from 'react-native'

class CodeReader extends Component {
  static navigationOptions = {
    title: 'バーコード読み取り',
  }
  render() {
    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('ResultList', {})}
          title='次のページへ' />
      </View>
    )
  }
}

export default CodeReader
