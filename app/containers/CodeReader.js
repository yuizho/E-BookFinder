import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Camera from '../components/Camera';
import CameraInit from '../components/CameraInit';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Answers } from 'react-native-fabric';

class CodeReader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ISBNバーコード読み取り',
    headerStyle: {
      backgroundColor: '#2A4073',
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
      readed: false,
      startedCamera: false,
      isFirstTime: true
    }
  }

  componentWillUnmount = () => {
    this.setState({readed: true, startedCamera: false, isFirstTime: false})
  }

  componentWillMount = () => {
    this.setState({readed: false})
  }

  onBarCodeRead = (event) => {
    if (!this.state.readed) {
      this.componentWillUnmount()
      Answers.logSearch(event.data)
      this.props.navigation.navigate('ResultList', {code: event.data})
      setTimeout(() => {
        this.componentWillMount();
      }, 3000);
    }
  }

  onStartCamera = () => {
    this.setState({startedCamera: true})
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.startedCamera ? <Camera readBarCode={this.onBarCodeRead} />
         : <CameraInit startCamera={this.onStartCamera} isFirstTime={this.state.isFirstTime}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    margin: 15,
  },
})

export default CodeReader
