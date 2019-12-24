import AsyncStorage from '@react-native-community/async-storage';

import {HeadlessJsTaskError} from 'HeadlessJsTask';

module.exports = async (taskData) => {
    await AsyncStorage.setItem('messageNotification', "true");

    return Promise.resolve();

};