import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native'
import * as Progress from 'react-native-progress';
import KoboClient from '../lib/koboClient'

class ResultList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'E-Book検索結果',
  })

  constructor(props) {
    super(props)
    // TODO: ISBNかどうかをチェックする必要がある
    const code = props.navigation.state.params.code
    this.state = { searching: false, items: [], errMsg: '' }
  }

  componentDidMount() {
    this.setState({searching: true})
    // fetch e-book data form API.
    Promise.all([KoboClient.retrieveKoboInfo(this.props.navigation.state.params.code)])
      .then((items) => {
        this.setState({searching: false, items: items[0]})
      })
      .catch((ex) => {
        console.error(ex)
      })
  }

  openURL(url) {
    Linking.openURL(url)
      .catch(err => console.error('an error occurred on browser', err));
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.searching ? <View style={styles.overlay}><Progress.Circle size={60} indeterminate={true} /></View>: null}
        <ScrollView>
          {!this.state.searching && this.state.items.map((item) => {
            // TODO: リストItemでコンポーネント化する
            return (
              <TouchableOpacity key={`${item.key}-view`} onPress={() => {this.openURL(item.url)}}>
                <Image
                   key={`${item.key}-image`}
                   style={{width: 50, height: 50}}
                   source={{uri: item.image}}
                   />
                <Text key={`${item.key}-title`}>{item.title}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf:'center',
    top: 0,
    right: 0,
    left: 0,
    bottom:0,
    backgroundColor: 'transparent',
  },
})

export default ResultList
