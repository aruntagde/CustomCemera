import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Lottie from './Lottie';
import GalleryView from './GalleryView';
import ParallalScrollView from './ParallalScrollView';
import GalleryHomePage from './GalleryHomePage';
import AsyncStorage from '@react-native-community/async-storage';

import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';


class HomeScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./Image/camera1.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Lottie />
                </SafeAreaView>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            isUpaloading: false,
            active: false,
            uploaded: 0,
            noOfImageToUpload: 0
        }
    }

    componentDidMount() {
        this.setState({ active: global.remainingImageToUpload ? true : false })
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./Image/gallery.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };


    uploadImage = async () => {

        if (!global.remainingImageToUpload) {
            global.remainingImageToUpload = []
        }

        if (!global.ImageValue) {
            global.ImageValue = []
        }



        if (global.remainingImageToUpload.length !== global.ImageValue.length) {
           

            this.setState({ isUpaloading: true, noOfImageToUpload: global.ImageValue.length - global.remainingImageToUpload.length });

            global.ImageValue.forEach((element, index) => {

                if (!global.remainingImageToUpload.some((ele => ele.FileName == element.FileName))) {


                    firebase
                        .storage()
                        .ref(`tutorials/images/${element.FileName}`)
                        .putFile(element.uri)
                        .on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            async (snapshot) => {

                                this.setState({ progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 })
                                if (snapshot.state === firebase.storage.TaskState.SUCCESS) {

                                    if (!global.remainingImageToUpload.some((ele => ele.FileName == element.FileName))) {
                                        global.remainingImageToUpload.push(element)

                                        this.setState({
                                            progress: 100,
                                            uploaded: this.state.uploaded === this.state.noOfImageToUpload ? 0 : this.state.uploaded + 1
                                        }, () => {
                                            if (this.state.noOfImageToUpload === this.state.uploaded) {
                                                this.setState({ isUpaloading: false });
                                            }
                                        })
                                    }
                                    await AsyncStorage.setItem('@myRePhoto', JSON.stringify(global.remainingImageToUpload));
                                }
                            },
                            error => {
                                unsubscribe();
                                alert('Sorry, Try again.');
                            }
                        )
                }

            });
        }else{
            alert("No Photo Remain to Upload")
        }

    };

    render() {
        return (
            <View >
                {
                    this.state.isUpaloading ?
                        <View style={{ flexDirection: 'row', justifyContent: "center", backgroundColor: 'black' }} >
                            <ActivityIndicator size="small" color="white" />
                            <Text style={{ color: 'white' }}>  {this.state.progress} %</Text>
                            <Text style={{ color: 'white', backgroundColor: "gray", borderRadius: 10, paddingHorizontal: 5 }}>
                                {this.state.uploaded}/{this.state.noOfImageToUpload}
                            </Text>

                        </View>
                        :
                        null
                }
                <GalleryHomePage />
                <NavigationEvents
                    onWillFocus={() => {
                        this.forceUpdate()
                    }}
                />

                {
                    this.state.isUpaloading ?
                        null
                        :
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                position: 'absolute',
                                bottom: 30,
                                right: 28,
                                height: 58,
                                zIndex: 2,
                                borderRadius: 100,
                                backgroundColor: "gray"
                            }}
                            onPress={this.uploadImage}

                        >
                            <Image
                                style={{ height: 30, width: 30, }}
                                source={require('./Image/cloud1.png')}

                            />
                        </TouchableOpacity>

                }

            </View>

        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

const TabNavigator = createBottomTabNavigator(
    {
        Camera: { screen: HomeScreen },
        Gallery: { screen: SettingsScreen }
    },
    {
        tabBarOptions: {
            activeTintColor: 'gold',
            inactiveTintColor: "gray",
            style: {
                backgroundColor: '#1a1a1a',
                height: 60,
                padding: 7
            }
        }
    }
);

export default createAppContainer(TabNavigator);