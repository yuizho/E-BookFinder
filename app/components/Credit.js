import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import Markdown from 'react-native-simple-markdown'

class Credit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.credit}>
        <Text style={styles.creditTitle}>クレジット</Text>
        <ScrollView>
          <Markdown styles={markdownStyles}>{licences}</Markdown>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  credit: {
    margin: 20,
    flex: 0.77,
  },
  creditTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
})

const markdownStyles = {
  heading3: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}

const licences = `
### title

smaple content

aaaa

bbbb
`
        
export default Credit
