import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Button,
} from 'react-native'
import NativeCamera from 'react-native-camera';

class Camera extends Component {
  constructor(props) {
    super(props)
    this.camera = null
    this.state = {
      camera: {
        aspect: NativeCamera.constants.Aspect.fill,
        captureTarget: NativeCamera.constants.CaptureTarget.cameraRoll,
        type: NativeCamera.constants.Type.back,
        orientation: NativeCamera.constants.Orientation.auto,
        flashMode: NativeCamera.constants.FlashMode.auto,
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NativeCamera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          onBarCodeRead={this.props.readBarCode}
          defaultTouchToFocus
          mirrorImage={false}
          />
        <View style={styles.overlayTop}/>
        <View style={styles.overlayLine}/>
        <View style={styles.overlayBottom}/>
        {__DEV__ ? <Button title='button-9784062935579' onPress={() => {this.props.readBarCode({data: '9784062935579'})}}/>: null}
        {__DEV__ ? <Button title='button-9784594045470' onPress={() => {this.props.readBarCode({data: '9784594045470'})}}/>: null}
        {__DEV__ ? <Button title='button-notisbn' onPress={() => {this.props.readBarCode({data: '9784594045'})}}/>: null}
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

export default Camera
