import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../utils';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useSelector } from 'react-redux';
const MainFeature = ({img, onPress, title,fontSize=11, width='22%', height, widthImg=40, heightImg=40,backgroundColor=colors.silverWhite}) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.container(width,height,widthImg,heightImg)}>
        
              <View style={styles.vImg(widthImg, heightImg,backgroundColor)}>
                    {
                      img && (
                        <Image source={img} style={styles.img}  resizeMode="contain"/>
                      )
                    }
              </View>
        <Text style={styles.title(fontSize)}>{title}</Text>
       
      </TouchableOpacity>
  );
};

export default MainFeature;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: (width,height)=>({
    width: width,
    height: height,
    margin: '1%',
    paddingBottom: 4,
    backgroundColor: colors?.white,
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 1.27,
    // shadowRadius: 4.65,
    // elevation: 6,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 1.65,
    // elevation: 0.5,
    alignItems: 'center',
  }),
  containerTouch:{
    alignItems: 'center',
  },
  vImg: (widthImg,heightImg, backgroundColor =colors?.silverWhite )=>({
    width: widthImg,
    height: heightImg,
    margin: -2,
    // paddingTop:2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  }),
  img: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
  title:(fontSize)=> ({
    // fontFamily: 'Lato-Bold',
    fontSize: fontSize,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '400',
    color: '#000000',
    // color: colors.white,
  }),
  iconNew: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
