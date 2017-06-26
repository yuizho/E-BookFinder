import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native'
import * as Progress from 'react-native-progress';
import ApiClient from '../lib/apiClient'
import Book from '../components/Book'
import Config from 'react-native-config'
import ISBN from 'isbnjs'

function goBackDialog(title, content, navigation) {
  Alert.alert(title, content,
              [{text: '戻る', onPress:() => navigation.goBack()}],
              {cancelable: false})
}

class ResultList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'E-Book検索結果',
    headerRight: (
      <TouchableOpacity
         style={styles.headerRight}
         onPress={() => {navigation.navigate('AboutApp')}}>
        <Text>info</Text>
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props)
    
    this.state = { searching: false, items: [], errMsg: '' }
  }

  componentDidMount() {
    this.setState({searching: true})
    const isbn = this.props.navigation.state.params.code
    const parsedISBN = ISBN.parse(isbn)
    if (!parsedISBN || !parsedISBN.isIsbn13()) {
      // isbn check
      goBackDialog('バーコードエラー',
                   '書籍上部のISBNコードを読み取ってください。別のバーコードが読み取られてしまう場合は、指などで隠した上で読み取りを行ってください',
                   this.props.navigation)
    } else {
      // fetch e-book data form API.
      Promise.all([ApiClient.get(Config.API_URL + this.props.navigation.state.params.code)])
        .then((result) => {
          const ebooks = result[0].ebooks
          if (!ebooks.length) {
            goBackDialog('E-Book検索結果',
                         'バーコードを読み取った本の電子書籍はみつかりませんでした。',
                         this.props.navigation)
          } else {
            this.setState({searching: false, items: ebooks})
          }
        })
        .catch((ex) => {
          console.log(ex)
          if (ex.status === 500 || ex.status === 503) {
            goBackDialog('サーバエラー',
                         '現在サーバが混み合っています。少し時間をおいてから、再度バーコードを読み取ってください。',
                         this.props.navigation)
          } else {
            goBackDialog('通信エラー',
                         '通信エラーが発生しました。通信状態を確認して、再度バーコードを読み取ってください。',
                         this.props.navigation)
          }
        })
    }
  }

  openURL(url) {
    Linking.openURL(url)
      .catch(err => console.log('an error occurred on browser', err));
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.searching ? <View style={styles.overlay}><Progress.Circle size={60} indeterminate={true} /></View>: null}
        <ScrollView>
          {!this.state.searching && this.state.items.map((item) => {
            return (
              <Book
                 key={item.key}
                 item={item}
                 openURL={this.openURL}
                 />
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
  headerRight: {
    margin: 15,
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
