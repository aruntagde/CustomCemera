/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
// import uploadImageInBackground from './uploadImageInBackground'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('uploadImage', () => uploadImageInBackground);