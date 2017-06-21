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
        <View style={styles.bookTextBox}>
          <Text>{item.title}</Text>
          <Text>{item.type}</Text>
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
  bookTextBox: {
    marginLeft: 5,
  },
  bookImage: {
    width: 80,
    height: 80,
  }
})

export default Book
