import React, { Component } from 'react';
import { View, TouchableOpacity, ProgressBarAndroid, Text, Image, Alert, Animated, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class Example extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ImageBackground
                style={{ width: '100%', height: 220, paddingVertical: 20 }}
                resizeMode="cover"
                blurRadius={1}
                source={require('./Image/mapworld.jpg')}
            >
                <NavigationEvents
                    onWillFocus={() => {
                        this.forceUpdate()
                    }}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Image
                        style={{ width: 90, height: 90 }}
                        source={require('./Image/p1.png')}
                    />
                    <Text style={{ fontSize: 34, color: "white" }}>Gallery</Text>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: "#c2d6d6", paddingHorizontal: 10, borderRadius: 50 }}>
                        <Image
                            style={{ width: 34, height: 34 }}
                            source={require('./Image/photp.png')}
                        />
                        <Text style={{ fontSize: 15, color: "white" }}>
                            {global.ImageValue ? global.ImageValue.length : 0} Photos : {global.remainingImageToUpload ? global.remainingImageToUpload.length : 0} Uploaded Photos
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}