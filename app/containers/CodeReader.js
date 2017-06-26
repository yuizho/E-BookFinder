import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';

class CodeReader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ISBNバーコード読み取り',
    headerStyle: {
      backgroundColor: '#039588',
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
    headerRight: (
      <TouchableOpacity
         style={styles.headerRight}
         onPress={() => {navigation.navigate('AboutApp')}}>
        <Icon name="info" size={30} color="#fff" />
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props);
    this.camera = null
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        readed: false,
      },
      isRecording: false,
    }
  }

  componentWillUnmount() {
    this.setState({readed: true})
  }

  componentWillMount() {
    this.setState({readed: false})
  }

  _onBarCodeRead = (event) => {
    if (!this.state.readed) {
      this.componentWillUnmount()
      this.props.navigation.navigate('ResultList', {code: event.data})
      setTimeout(() => {
        this.componentWillMount();
      }, 3000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          onBarCodeRead={this._onBarCodeRead}
          defaultTouchToFocus
          mirrorImage={false}
          />
          <View style={styles.overlayTop}/>
          <View style={styles.overlayLine}></View>
          <View style={styles.overlayBottom}/>
          {__DEV__ ? <Button title='button-9784062935579' onPress={() => {this.props.navigation.navigate('ResultList', {code: '9784062935579'})}}/>: null}
          {__DEV__ ? <Button title='button-9784594045470' onPress={() => {this.props.navigation.navigate('ResultList', {code: '9784594045470'})}}/>: null}
          {__DEV__ ? <Button title='button-notisbn' onPress={() => {this.props.navigation.navigate('ResultList', {code: '9784594045'})}}/>: null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    margin: 15,
  },
  overlayTop: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    top: 0,
    right: 0,
    left: 0,
    height: '30%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayLine: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    top: '50%',
    right: 0,
    left: 0,
    borderColor: 'red',
    borderWidth: 1,
  },
  overlayBottom: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    height: '30%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
})

export default CodeReader
