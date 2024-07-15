// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {color} from 'react-native-reanimated';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   IconHomeOffI,
//   IconKategoriOffI,
//   IconKategoriOnI,
//   IconUserI,
// } from '../../../assets';
// import { getMyNotifCount } from '../../../redux/action/notif';
import { colors, fonts, getData } from '../../../utils';
import { WARNA_DISABLE } from '../../../utils/constants';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconFavorite, IconFavoriteInactive, IconHome, IconHomeInactive, IconOrder, IconOrderInactive } from '../../../assets/icon';
// import Entypo from "react-native-vector-icons/Entypo";
// import * as Animatable from 'react-native-animatable';

const IconB = ({ label, isFocused, imageProfil, imageProfilStatus = true, myNotifActiveCount, color = colors?.primary }) => {


  if (label === 'Home') {
    return isFocused ? (
      //   <Icon
      //   name="home"
      //   size={23}
      //   solid
      //   color={color}
      // />
        <Image
          animation="rubberBand"
          // duration={1000}
          resizeMode="contain" 
          source={IconHome} style={{ width: 22, height: 22 }} />
     
    ) : (
      //   <Icon
      //   name="home"
      //   size={23}
      //   solid
      //   color={color}
      // />
      <Image
        animation="rubberBand"
        // duration={1000} 
        resizeMode="contain"
        source={IconHomeInactive} style={{ width: 22, height: 22 }} />
    );
  }
  if (label === 'Diorder') {
    return isFocused ? (
      <View>
        {/* <Icon
          name="bell"
          size={23}
          solid
          color={color}
        /> */}
       <Image
          animation="rubberBand"
          // duration={1000}
          resizeMode="contain" 
          source={IconOrder} style={{ width: 22, height: 22 }} />
        {/* <View
          style={{
            width: 'auto',
            height: 11,
            padding: 1,
            borderRadius: 10,
            alignItems: 'center',
            position: 'absolute',
            right: 2,
            top: 2,
            backgroundColor: colors?.red,
          }}>
          <Text style={{ color: 'white', fontSize: 6 }}>{myNotifActiveCount}</Text>
        </View> */}
      </View>
    ) : (
      <View>
        {/* <Icon
          name="bell"
          size={23}
          color={colors.silver}
        /> */}
        <Image
          animation="rubberBand"
          // duration={1000} 
          resizeMode="contain"
          source={IconOrderInactive} style={{ width: 22, height: 22 }} />
        {/* <Image source={IconNotifOffI} style={{width: 25, height: 25}} /> */}
        {/* <View
          style={{
            width: 'auto',
            height: 11,
            padding: 2,
            borderRadius: 10,
            alignItems: 'center',
            position: 'absolute',
            right: 2,
            top: 2,
            backgroundColor: colors?.red,
          }}>
          <Text style={{ color: 'white', fontSize: 6 }}>{myNotifActiveCount}</Text>
        </View> */}
      </View>
    );
  }
  if (label === 'Favorite') {
    return isFocused ? (
      // <Icon
      //   name="home"
      //   size={23}
      //   solid
      //   color={color}
      // />
      <Image
      animation="rubberBand"
      // duration={1000} 
      resizeMode="contain"
      source={IconFavorite} style={{ width: 22, height: 22 }} />
    ) : (
      // <Icon
      //   name="bell"
      //   size={23}
      //   solid
      //   color={color}
      // />
      <Image
          animation="rubberBand"
          // duration={1000}
          resizeMode="contain" 
          source={IconFavoriteInactive} style={{ width: 22, height: 22 }} />
    );
  }
  return <Icon
    name="home"
    size={23}
    solid
    color={color}
  />;
};
//class TabItem extends Component {
const TabItem = ({ onPress, onLongPress, label, isFocused }) => {
  //= ({ isFocused, onPress, onLongPress, label, imageProfil }) =>
  // constructor(props) {
  //   super(props);
  // console.warn('pr', props)
  // const dispatch = useDispatch();
  // const navigation = useNavigation()
  // const { authUser } = useSelector((state) => state.authReducer);
  // console.log('authuser', authUser?.imageProfil)
  // const { myNotifActiveCount } = useSelector((state) => state.myNotifReducer);
  // console.log('authUser',authUser)


  // const init = async () =>{
  //  await dispatch(
  //     getMyNotifCount({user_id: authUser.id}),
  //   );
  // }
  // useEffect(() => {
  //   // navigation.addListener('focus', () => {
  //   //   setTimeout(()=>{
  //   //   //  init();
  //   //   },3000)
  //   // });

  // }, [])
  //}

  // render() {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View
        // animation="rubberBand"
        // duration={500}
        style={{ margin: 2, alignItems: 'center', justifyContent: 'center' }}>
        <IconB
          label={label}
          isFocused={isFocused}

        />
      </View>
      {/* {
        isFocused && ( */}
      <Text style={styles.text(isFocused)}>
        {label}
      </Text>
      {/* )
      } */}

    </TouchableOpacity>
  );
  // }
}

export default TabItem;

const styles = StyleSheet.create({
  container: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    
    // backgroundColor: 'blue'
  },
  text: (isFocused) => ({
    fontSize: 8,
    marginTop: 0,
    color: isFocused ? colors.default : WARNA_DISABLE,
    fontFamily: fonts?.primary?.Normal,
  }),
});
