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
  AsyncStorage,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import CodeReader from './app/containers/CodeReader'
import ResultList from './app/containers/ResultList'
import AboutApp from './app/containers/AboutApp'
import genUUID from 'uuid/v4'

(() => {
  AsyncStorage.getItem('uuid').then((uuid) => {
    console.log(uuid)
    if (uuid === null){
      AsyncStorage.setItem('uuid', genUUID())
    }
  })
})()

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
  AboutApp:   { screen: AboutApp },
})

AppRegistry.registerComponent('EBookFinder', () => App)
