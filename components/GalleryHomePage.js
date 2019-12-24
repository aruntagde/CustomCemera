import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ParallalScrollView from './ParallalScrollView';

export default class Example extends Component {
    render() {
        return (
            <ScrollView>
                <ParallalScrollView />
            </ScrollView>
        );
    }
} 