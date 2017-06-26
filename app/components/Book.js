import React, { Component } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'

class Book extends Component {
  constructor(props) {
    super(props)
  }

  getBookTypeStyles = (type) => {
    let s = {}
    s.fontWeight = 'bold'
    s.flex = 0.1
    if (type === 'kindle')
      s.color = '#ff9900'
    else if (type === 'kobo')
      s.color =  '#bf0000'
    return s
  }

  render() {
    const item = this.props.item
    return(
      <TouchableOpacity
         style={styles.bookItem}
         onPress={() => {this.props.openURL(item.url)}}
         >
        <Image
           resizeMode={Image.resizeMode.contain}
           style={styles.bookImage}
           source={{uri: item.image}}
           />
        <View style={styles.bookTextView}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={this.getBookTypeStyles(item.type)}>
            {item.type}
          </Text>
        </View>
      </TouchableOpacity> 
    )
  }
}

const styles = StyleSheet.create({
  bookItem: {
    marginTop: -1,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  bookTextView: {
    flex: 0.8,
    paddingLeft: 10,
  },
  bookTitle: {
    flex: 0.9,
  },
  bookImage: {
    flex: 0.2,
    width: 80,
    height: 80,
  }
})

export default Book
