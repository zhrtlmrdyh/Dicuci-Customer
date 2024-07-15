import { Dimensions } from "react-native";

export const WARNA_UTAMA = '#55C895';
export const WARNA_DISABLE = '#C8C8C8';
export const WARNA_SEKUNDER = '#E0F7EF';
export const WARNA_ABU_ABU = '#F6F6F6';
export const WARNA_WARNING = '#DAA520';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const sum  = (items,prop)=>{
    return items.reduce( function(a,b){
        return a + b[prop];
    }, 0);
};

