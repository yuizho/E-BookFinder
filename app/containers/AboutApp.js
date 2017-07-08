import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native'
import Credit from '../components/Credit'
import appInfo from 'EBookFinder/package.json'
import Config from 'react-native-config'
import { Answers } from 'react-native-fabric';

class AboutApp extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'このアプリについて',
    headerStyle: {
      backgroundColor: '#2A4073',
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
  })

  constructor(props) {
    super(props)
  }

  openURL(url) {
    Answers.logCustom('open url', { url: url });
    Linking.openURL(url)
      .catch(err => console.log('an error occurred on browser', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.about}>
          <Image
             style={styles.appImage}
             source={require('../img/android_icon.png')}
             />
          <Text style={styles.aboutText}>E-BookFinder (ver {appInfo.version})</Text>
          <TouchableOpacity
             onPress={() => {this.openURL(Config.PRIVACY_POLICY)}}>
            <Text style={styles.aboutLink}>
              プライバシーポリシー
            </Text>
          </TouchableOpacity>
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
  aboutLink: {
    fontSize: 15,
    margin: 3,
    color: '#2A4073',
    textDecorationLine: 'underline',
  }
})

export default AboutApp
