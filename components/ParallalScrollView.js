import React, { Component } from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { View, TouchableOpacity, ProgressBarAndroid, Text, Image, Alert, Animated, ImageBackground } from 'react-native';
import CustomScrollView from './GalleryView'
import ImageView from './AnimatedScrollView'
import AsyncStorage from '@react-native-community/async-storage';

const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)

export default class Example extends Component {
    render() {
        return (
            <ParallaxScrollView
                backgroundColor="black"
                contentBackgroundColor="black"
                parallaxHeaderHeight={220}
                renderForeground={() => (
                    <View style={{ height: 220, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ImageView />
                    </View>
                )}>
                <View>
                    <AnimatedCustomScrollView />
                </View>
            </ParallaxScrollView>
        );
    }
}