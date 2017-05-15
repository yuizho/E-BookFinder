import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation'

class CodeReader extends Component {
  static navigationOptions = {
    key: 'code-reader-nav-bar',
    headerColor: 'blue',
    title: 'バーコード読み取り',
  }

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
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='push'
          onPress={() => {this.props.navigation.navigate('ResultList', {code: '9784062935579'})}}
          />
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
          <View style={styles.overlay}/>
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
  overlay: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf:'center',
    // TODO: 固定長なのでちゃんと書きたい
    top: 150,
    right: 0,
    left: 0,
    height: 200,
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 4,
  }
})

export default CodeReader
