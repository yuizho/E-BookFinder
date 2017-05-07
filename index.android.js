/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  
  AppRegistry,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import CodeReader from './app/containers/CodeReader'
import ResultList from './app/containers/ResultList'

export default class EBookFinder extends Component {
  render() {
    return (
      <App />
    )
  }
}

const App = StackNavigator({
  CodeReader: { screen: CodeReader },
  ResultList: { screen: ResultList },
})

AppRegistry.registerComponent('EBookFinder', () => App)
