import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import Balloon from './Balloon'
import Icon from 'react-native-vector-icons/MaterialIcons';

class CameraInit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.startCamera}>
          <Icon name="photo-camera"
                size={90}
                color="#2A4073"/>
        </TouchableOpacity>
        {this.props.isFirstTime ? <Balloon message={'タップするとカメラを起動します'}/> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center', 
    top: '40%',
    right: 0,
    left: 0,
  },
})

export default CameraInit
