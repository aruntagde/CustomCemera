import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, ScrollView, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
var { height, width } = Dimensions.get('window');
export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageuri: '',
            ModalVisibleStatus: false,
        };
    }

    ShowModalFunction(visible, imageURL) {
        this.setState({
            ModalVisibleStatus: visible,
            imageuri: imageURL,
        });
    }

    render() {
        if (this.state.ModalVisibleStatus) {
            return (
                <Modal
                    transparent={false}
                    animationType={'fade'}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={() => {
                        this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                    }}>
                    <View style={styles.modelStyle}>
                        <Image
                            style={styles.fullImageStyle}
                            source={{ uri: this.state.imageuri }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.closeButtonStyle}
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => {
                                this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                            }}>
                            <Image
                                source={require('./Image/close_white.png')}
                                style={{ width: 25, height: 25, marginTop: 16 }}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        } else {
            return (
                <View>
                    
                    <NavigationEvents
                        onWillFocus={() => {
                            this.forceUpdate()
                        }}
                    />
                    <FlatList
                        data={global.ImageValue}
                        numColumns={2}
                        renderItem={(item) => {

                            return (
                                <ScrollView
                                    style={{ height: 200, flex: 1 }}
                                >
                                    {
                                        global.remainingImageToUpload ?
                                            global.remainingImageToUpload.some((ele) => ele.FileName === item.item.FileName) ?
                                                < Image
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        right: 0,
                                                        zIndex: 2,
                                                        alignItems: 'flex-end',
                                                        backgroundColor: '#5bd4fc',
                                                        borderBottomRightRadius: 10
                                                    }}
                                                    resizeMode="cover"
                                                    source={require('./Image/tick.png')}

                                                />
                                                :
                                                <View style={{ height: 20 }}></View>
                                            :
                                            <View style={{ height: 20 }}></View>
                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.ShowModalFunction(true, item.item.uri);
                                        }}>
                                        <Image
                                            style={{ height: 300, width: width / 2, top: -20, }}
                                            resizeMode="cover"
                                            source={{ uri: item.item.uri }}

                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            )
                        }}
                    />
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute',
    },
});
