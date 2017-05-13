import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation'
import { EventEmitter } from 'events';
import { Observable } from 'rx';

const emitter = new EventEmitter();
Observable
  .fromEvent(emitter, 'onBarCodeRead')
  .debounce(150)
  .subscribe(value => {
                 console.log(`observed: ${value.event.data}`)
                 value.navigation.navigate('ResultList', {code: value.event.data})
             },
             error => console.log(`error: ${error.event.data}`),
             () => console.log('onCompleted')
            );

class CodeReader extends Component {
  static navigationOptions = {
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
      },
      isRecording: false,
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
          onBarCodeRead={(event) => {
            console.log(`readed: ${event.data}`)
            emitter.emit('onBarCodeRead', {event: event, navigation: this.props.navigation})
          }}
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
