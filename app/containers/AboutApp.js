import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import Credit from '../components/Credit'
import appInfo from 'EBookFinder/package.json'

class AboutApp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'このアプリについて',
    headerStyle: {
      backgroundColor: '#211E55',
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
  })

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.about}>
          <Image
             style={styles.appImage}
             source={require('../img/android_icon.png')}
             />
          <Text style={styles.aboutText}>E-BookFinder</Text>
          <Text style={styles.aboutText}>
            バージョン: {appInfo.version}
          </Text>
        </View>
        <Credit/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  about: {
    margin: 20,
    flex: 0.3,
    alignItems: 'center',
  },
  appImage: {
    width: 96,
    height: 96,
  },
  aboutText: {
    fontSize: 15,
    margin: 3
  },
})

export default AboutApp
