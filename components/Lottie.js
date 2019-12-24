import React from 'react';
import LottieView from 'lottie-react-native';
import { View, TouchableOpacity, ProgressBarAndroid, Text, Dimensions, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
var { height, width } = Dimensions.get('window');


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class BasicExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      uploading: false,
      imageUri: [],
      progress: 0,
      images: [],
      fileN: []
    }
  }



  uploadImage = () => {


    this.setState({ uploading: true });

    firebase
      .storage()
      .ref(`tutorials/images/${fileN}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes)
          };

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            let allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: [],
              progress: 0,
              images: allImages
            };
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );


  };




  handleImagePicker = () => {

    ImagePicker.launchCamera(options, async (response) => {

      if (response.data) {

        try {
          let value = await AsyncStorage.getItem('@mydata');
          if (!value) {
            value = []
          } else {
            value = JSON.parse(value)
          }
          value.push(
            {
              'FileName': response.fileName,
              'time': response.timestamp,
              'uri': response.uri
            }
          )
          await AsyncStorage.setItem('@mydata', JSON.stringify(value));
          global.ImageValue = value;

          // let remainPhoto = await AsyncStorage.getItem('@myRePhoto')
          // if (!remainPhoto) {
          //   remainPhoto = []
          // } else {
          //   remainPhoto = JSON.parse(remainPhoto)
          // }

          // remainPhoto.push({
          //   'FileName': response.fileName,
          //   'time': response.timestamp,
          //   'uri': response.uri
          // })

          // await AsyncStorage.setItem('@myRePhoto', JSON.stringify(remainPhoto));
          // global.remainingImageToUpload = remainPhoto;
          this.setState({
            avatarSource: response,
            imageUri: response.uri,
            fileN: response.fileName
          });

        } catch (error) {

          console.log(error);

        }
      }


    });
  }

  render() {
    return (

      <View style={{
        backgroundColor: 'black',
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {
          this.state.avatarSource ?

            <Image
              source={this.state.avatarSource}
              style={{
                width: width,
                height: height,
                padding: 20
              }}
            />
            :
            <LottieView
              source={require('./santa.json')}
              style={{
                width: width,
                height: height,
                backgroundColor: "white"
              }}
              autoPlay
              loop
            />

        }
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: 30,
            right: 28,
            height: 60,
            zIndex: 2,
            borderRadius: 100,
            backgroundColor: "gray"
          }}
          onPress={this.handleImagePicker}

        >
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./Image/p1.png')}

          />
        </TouchableOpacity>
      </View>

    );
  }
}