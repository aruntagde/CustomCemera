/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './components/Navigation';
import AsyncStorage from '@react-native-community/async-storage';




class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {

    global.ImageValue = JSON.parse(await AsyncStorage.getItem('@mydata'));
    global.remainingImageToUpload = JSON.parse(await AsyncStorage.getItem('@myRePhoto'));

  }

  render() {
    return (
      <Navigation />
    );
  }

};

export default App;
