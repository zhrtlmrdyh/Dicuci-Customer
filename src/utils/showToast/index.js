import {ToastAndroid} from 'react-native';
export const showToast = (message, type) => {
        ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    
};

