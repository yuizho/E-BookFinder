import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

class Balloon extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>        
        <View style={[styles.triangle, this.props.style]} />
        <View style={styles.talkBubbleSquare}>
          <Text>{this.props.message}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff'
  },
  talkBubbleSquare: {
    width: 200,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
})

export default Balloon
