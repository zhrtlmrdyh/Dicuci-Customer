import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View,Image,} from 'react-native';
// import { IconCatG, IconLoading4G, IconLoadingC } from '../../../assets';
import { colors } from '../../../utils';
import { windowHeight, windowWidth } from '../../../utils/constants';
// import {RippleLoader } from 'react-native-indicator';
const Loading = ({position= 'absolute',backgroundColor='rgba(0,0,0,0.1)', size='large',height=50, icon}) => {
  return (
    <View style={styles.container(position, backgroundColor,height)}>
        <View style={styles.modal}>
          {/* {
            icon == "RippleLoader" && (
              <RippleLoader size={40} color={colors?.primary}/>   
            )
          } */}
          {
            !icon && (
              <ActivityIndicator size={size} color={colors.primary} />
            )
          }
           {/* <Image source={IconCatG} style={styles.modal}/> */}
           {/* <Image source={IconLoading4G} style={styles.modal}/> */}
           {/* <Image source={IconLoading4G} style={styles.modal}/> */}
            {/* <IconLoadingC size={40}/> */}
        </View>
        {/* <Text>Memuat...</Text> */}
    </View>
  );
};

export default Loading;
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: (position, backgroundColor, height)=>({
    
    position: position,
    height: height,
    flex: 1,
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  modal:{
    width: 50,
    height: 50,
    borderRadius: 5,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.silverWhite,
  },
  text: {
    fontSize: 18,
    marginTop: 12,
  },
});
