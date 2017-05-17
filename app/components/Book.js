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
           style={styles.bookImage}
           source={{uri: item.image}}
           />
        <View >
          <Text>{item.title}</Text>
          <Text>{item.type}</Text>
        </View>
      </TouchableOpacity> 
    )
  }
}

const styles = StyleSheet.create({
  bookItem: {
    flex: 1,
    flexDirection: 'row',
  },
  bookImage: {
    width: 64,
    height: 64,
  }
})

export default Book
