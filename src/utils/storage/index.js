import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from '../showMessage';

export const storeData = async (storageKey,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
      console.log("eror storeData", e)
      showMessage('Gagal menyimpan di localstorage')
    }
  }
  export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log("eror getData", e)
    showMessage('Gagal mengambil data di localstorage' + e)

  }
}

  